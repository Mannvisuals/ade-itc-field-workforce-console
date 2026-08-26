"use client";

// Client-side "live" state for the parts of the demo that a field executive's
// actions actually move: their map pin, the outreach counters, and their own
// today/activity log. Everything else (payroll, compliance, attendance,
// issues) stays static and is read straight from content/data.ts.
//
// State is synced across browser tabs on the same machine via BroadcastChannel
// so that logging an activity on /field is visible on /programme in another
// tab a moment later. There is no server: a fresh browser (or all tabs closed)
// always starts back at the baseline defined in content/data.ts.

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import {
  fieldExecutive,
  fieldPinsBaseline,
  outreachStatsBaseline,
  districtOutreachBaseline,
  type FieldPin,
  type OutreachStats,
  type DistrictOutreach,
  type ActivityType,
  type LoggedEntry,
} from "@/content/data";

const CHANNEL_NAME = "fwc-live-sync";
const FIELD_EXEC_ID = fieldExecutive.id;

interface LiveState {
  pins: FieldPin[];
  outreachStats: OutreachStats;
  districtOutreach: DistrictOutreach[];
  fieldToday: {
    checkIn: { time: string; village: string; verified: boolean };
    target: { total: number; done: number };
    entries: LoggedEntry[];
  };
  fieldActivity: {
    month: { householdsReached: number; conversionPct: number };
    target: number;
    entries: LoggedEntry[];
  };
}

type LiveAction =
  | { type: "REPLACE_STATE"; payload: LiveState }
  | {
      type: "LOG_ACTIVITY";
      payload: { activityType: ActivityType; village: string; time: string; date: string };
    };

function buildInitialState(): LiveState {
  return {
    pins: fieldPinsBaseline.map((p) => ({ ...p })),
    outreachStats: { ...outreachStatsBaseline },
    districtOutreach: districtOutreachBaseline.map((d) => ({ ...d })),
    fieldToday: {
      checkIn: { ...fieldExecutive.today.checkIn },
      target: { ...fieldExecutive.today.target },
      entries: fieldExecutive.today.entries.map((e) => ({ ...e })),
    },
    fieldActivity: {
      month: { ...fieldExecutive.activity.month },
      target: fieldExecutive.activity.target,
      entries: fieldExecutive.activity.entries.map((e) => ({ ...e })),
    },
  };
}

function reducer(state: LiveState, action: LiveAction): LiveState {
  switch (action.type) {
    case "REPLACE_STATE":
      return action.payload;

    case "LOG_ACTIVITY": {
      const { activityType, village, time, date } = action.payload;
      const isHouseholdVisit = activityType === "Household visit";
      const execPin = state.pins.find((p) => p.id === FIELD_EXEC_ID);
      const execDistrict = execPin?.district;

      const newEntry: LoggedEntry = {
        village,
        type: activityType,
        photoAttached: true,
        gpsVerified: true,
      };

      return {
        ...state,
        pins: state.pins.map((p) =>
          p.id === FIELD_EXEC_ID
            ? { ...p, status: "in_boundary", lastActivity: `${activityType} logged ${time}` }
            : p
        ),
        districtOutreach: state.districtOutreach.map((d) =>
          d.district === execDistrict && isHouseholdVisit
            ? { ...d, households: d.households + 1 }
            : d
        ),
        outreachStats: {
          ...state.outreachStats,
          householdsReached:
            state.outreachStats.householdsReached + (isHouseholdVisit ? 1 : 0),
          sessionsConducted: state.outreachStats.sessionsConducted + 1,
          sessionsToday: state.outreachStats.sessionsToday + 1,
        },
        fieldToday: {
          ...state.fieldToday,
          target: {
            ...state.fieldToday.target,
            done: state.fieldToday.target.done + (isHouseholdVisit ? 1 : 0),
          },
          entries: [...state.fieldToday.entries, { ...newEntry, time }],
        },
        fieldActivity: {
          ...state.fieldActivity,
          month: {
            ...state.fieldActivity.month,
            householdsReached:
              state.fieldActivity.month.householdsReached + (isHouseholdVisit ? 1 : 0),
          },
          entries: [{ ...newEntry, date }, ...state.fieldActivity.entries],
        },
      };
    }

    default:
      return state;
  }
}

interface LiveStoreContextValue {
  state: LiveState;
  logActivity: (activityType: ActivityType, village: string) => void;
}

const LiveStoreContext = createContext<LiveStoreContextValue | null>(null);

export function LiveStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;

    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const msg = event.data as
        | { type: "REQUEST_STATE" }
        | { type: "STATE_SNAPSHOT"; payload: LiveState }
        | { type: "ACTION"; action: LiveAction }
        | undefined;
      if (!msg) return;

      if (msg.type === "REQUEST_STATE") {
        // Another tab just opened: hand it our current state.
        channel.postMessage({ type: "STATE_SNAPSHOT", payload: stateRef.current });
      } else if (msg.type === "STATE_SNAPSHOT") {
        dispatch({ type: "REPLACE_STATE", payload: msg.payload });
      } else if (msg.type === "ACTION") {
        dispatch(msg.action);
      }
    };

    // Ask any already-open tab for the latest state so we don't start stale.
    channel.postMessage({ type: "REQUEST_STATE" });

    return () => channel.close();
  }, []);

  function logActivity(activityType: ActivityType, village: string) {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const date = "12 Mar";

    const action: LiveAction = {
      type: "LOG_ACTIVITY",
      payload: { activityType, village, time, date },
    };
    dispatch(action);
    channelRef.current?.postMessage({ type: "ACTION", action });
  }

  return (
    <LiveStoreContext.Provider value={{ state, logActivity }}>
      {children}
    </LiveStoreContext.Provider>
  );
}

export function useLiveStore() {
  const ctx = useContext(LiveStoreContext);
  if (!ctx) throw new Error("useLiveStore must be used within LiveStoreProvider");
  return ctx;
}
