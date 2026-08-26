"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { fieldExecutive } from "@/content/data";
import { useLiveStore } from "@/lib/liveStore";
import { PhotoThumb } from "@/components/ui/PhotoThumb";
import { LogActivityForm } from "@/components/field/LogActivityForm";

export function TodayTab() {
  const { name, dateLabel, labels } = fieldExecutive;
  const { state } = useLiveStore();
  const { checkIn, target, entries } = state.fieldToday;
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[15px] font-semibold text-deep">Hi, {name}</p>
        <p className="text-[12px] text-deep3">{dateLabel}</p>
      </div>

      <div className="flex items-center gap-3 rounded-panel border border-rule bg-card p-3">
        <PhotoThumb size={44} />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-verified" />
            <span className="text-[12.5px] font-medium text-deep">
              Checked in {checkIn.time}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[11.5px] text-deep3">
            Village {checkIn.village} ·{" "}
            {checkIn.verified ? "location verified" : "location pending"}
          </p>
        </div>
      </div>

      <div className="rounded-panel border border-rule bg-card p-3">
        <p className="panel-title">Today&apos;s target</p>
        <p className="mt-1 text-[14px] text-deep">
          <span className="font-mono font-semibold">
            {target.total} household visits
          </span>{" "}
          · <span className="font-mono">{target.done} done</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rule">
          <div
            className="h-full rounded-full bg-verified transition-all"
            style={{
              width: `${Math.min(100, (target.done / target.total) * 100)}%`,
            }}
          />
        </div>
      </div>

      {showForm ? (
        <LogActivityForm onDone={() => setShowForm(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full rounded-panel bg-action px-4 py-3 text-center text-[13px] font-semibold text-white"
        >
          {labels.logActivity}
        </button>
      )}

      <div>
        <p className="panel-title mb-2">Logged today</p>
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-panel border border-rule bg-card p-2.5"
            >
              <PhotoThumb size={36} />
              <div>
                <p className="text-[12.5px] font-medium text-deep">
                  {entry.type}
                </p>
                <p className="font-mono text-[11px] text-deep3">
                  {entry.time} · {entry.village}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
