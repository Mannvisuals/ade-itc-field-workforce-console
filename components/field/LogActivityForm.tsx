"use client";

import { useState } from "react";
import { Camera, MapPin, X } from "lucide-react";
import { activityTypes, sunitaVillages, type ActivityType } from "@/content/data";
import { useLiveStore } from "@/lib/liveStore";

export function LogActivityForm({ onDone }: { onDone: () => void }) {
  const { logActivity } = useLiveStore();
  const [type, setType] = useState<ActivityType>(activityTypes[0]);
  const [village, setVillage] = useState(sunitaVillages[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    logActivity(type, village);
    onDone();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-panel border border-brand/40 bg-brand/5 p-3"
    >
      <div className="flex items-center justify-between">
        <p className="panel-title">New activity</p>
        <button
          type="button"
          onClick={onDone}
          aria-label="Cancel"
          className="text-deep3 hover:text-deep"
        >
          <X size={15} />
        </button>
      </div>

      <div>
        <label className="mb-1 block text-[11.5px] font-medium text-deep3">
          Activity type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ActivityType)}
          className="w-full rounded-panel border border-rule bg-card px-2.5 py-2 text-[13px] text-deep outline-none focus:border-brand"
        >
          {activityTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-[11.5px] font-medium text-deep3">
          Village
        </label>
        <select
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          className="w-full rounded-panel border border-rule bg-card px-2.5 py-2 text-[13px] text-deep outline-none focus:border-brand"
        >
          {sunitaVillages.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 rounded-panel border border-dashed border-rule bg-card px-2.5 py-2 text-[11px] text-deep3">
        <span className="flex items-center gap-1">
          <Camera size={13} /> Photo attached
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={13} /> GPS verified
        </span>
      </div>

      <button
        type="submit"
        className="w-full rounded-panel bg-action px-4 py-2.5 text-center text-[13px] font-semibold text-white"
      >
        Submit activity
      </button>
    </form>
  );
}
