"use client";

// Client-side "live" state for the parts of the demo that a field executive's
// actions actually move: their map pin, the outreach counters, and their own
// today/activity log. Everything else (payroll, compliance, attendance,
// issues) stays static and is read straight from content/data.ts.
//
// State syncs across browsers via a small pub/sub layer with two possible
// transports, picked automatically:
//   - Supabase Realtime Broadcast, when NEXT_PUBLIC_SUPABASE_URL and
//     NEXT_PUBLIC_SUPABASE_ANON_KEY are set: works across separate devices
//     over the internet (a phone and a laptop, in different browsers). This
//     is what makes /field on a real phone update /programme on a PC.
//   - BroadcastChannel, when those env vars are absent: same-device only,
//     but zero network dependency, so local dev needs no setup.
// Either way there is no server-side state and no database write: a fresh
// browser (or every tab/device closed) always starts back at the baseline
// defined in content/data.ts, i.e. Sunita Devi not yet checked in for the day.

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
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

interface CheckIn {
  time: string;
  village: string;
  verified: boolean;
}

interface LiveState {
  pins: FieldPin[];
  outreachStats: OutreachStats;
  districtOutreach: DistrictOutreach[];
  fieldToday: {
    checkIn: CheckIn | null;
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
  | { type: "CHECK_IN"; payload: { time: string; village: string } }
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
      checkIn: fieldExecutive.today.checkIn ? { ...fieldExecutive.today.checkIn } : null,
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

    case "CHECK_IN": {
      // Already checked in: ignore a stray replay (e.g. from a slow tab).
      if (state.fieldToday.checkIn) return state;

      const { time, village } = action.payload;
      return {
        ...state,
        pins: state.pins.map((p) =>
          p.id === FIELD_EXEC_ID
            ? { ...p, status: "in_boundary", checkInTime: time, lastActivity: `Checked in ${time}` }
            : p
        ),
        fieldToday: {
          ...state.fieldToday,
          checkIn: { time, village, verified: true },
        },
      };
    }

    case "LOG_ACTIVITY": {
      // Logging field activity before checking in doesn't make sense; the UI
      // already prevents this, but guard the reducer too.
      if (!state.fieldToday.checkIn) return state;

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
  checkIn: (village: string) => void;
  logActivity: (activityType: ActivityType, village: string) => void;
}

const LiveStoreContext = createContext<LiveStoreContextValue | null>(null);

type SyncMessage =
  | { type: "REQUEST_STATE" }
  | { type: "STATE_SNAPSHOT"; payload: LiveState }
  | { type: "ACTION"; action: LiveAction };

export function LiveStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);
  // Set once the chosen transport (Supabase or BroadcastChannel) is ready to
  // publish. Calling publishRef before then would silently drop the message.
  const publishRef = useRef<((msg: SyncMessage) => void) | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleIncoming(msg: SyncMessage) {
      if (msg.type === "REQUEST_STATE") {
        // Another browser just joined: hand it our current state.
        publishRef.current?.({ type: "STATE_SNAPSHOT", payload: stateRef.current });
      } else if (msg.type === "STATE_SNAPSHOT") {
        dispatch({ type: "REPLACE_STATE", payload: msg.payload });
      } else if (msg.type === "ACTION") {
        dispatch(msg.action);
      }
    }

    const sb = supabase;
    if (sb) {
      // Cross-device: relayed through Supabase Realtime over the internet.
      const rt: RealtimeChannel = sb.channel(CHANNEL_NAME, {
        config: { broadcast: { self: false } },
      });
      rt.on("broadcast", { event: "msg" }, ({ payload }) =>
        handleIncoming(payload as SyncMessage)
      );
      rt.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          publishRef.current = (msg) => rt.send({ type: "broadcast", event: "msg", payload: msg });
          publishRef.current({ type: "REQUEST_STATE" });
        }
      });
      return () => {
        sb.removeChannel(rt);
        publishRef.current = null;
      };
    }

    if ("BroadcastChannel" in window) {
      // Same-device only fallback, e.g. local dev with no Supabase env vars.
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (event) => handleIncoming(event.data as SyncMessage);
      publishRef.current = (msg) => bc.postMessage(msg);
      publishRef.current({ type: "REQUEST_STATE" });
      return () => {
        bc.close();
        publishRef.current = null;
      };
    }
  }, []);

  function currentTime() {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  function checkIn(village: string) {
    const action: LiveAction = {
      type: "CHECK_IN",
      payload: { time: currentTime(), village },
    };
    dispatch(action);
    publishRef.current?.({ type: "ACTION", action });
  }

  function logActivity(activityType: ActivityType, village: string) {
    const action: LiveAction = {
      type: "LOG_ACTIVITY",
      payload: { activityType, village, time: currentTime(), date: "12 Mar" },
    };
    dispatch(action);
    publishRef.current?.({ type: "ACTION", action });
  }

  return (
    <LiveStoreContext.Provider value={{ state, checkIn, logActivity }}>
      {children}
    </LiveStoreContext.Provider>
  );
}

export function useLiveStore() {
  const ctx = useContext(LiveStoreContext);
  if (!ctx) throw new Error("useLiveStore must be used within LiveStoreProvider");
  return ctx;
}
