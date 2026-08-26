"use client";

import { fieldExecutive } from "@/content/data";
import { useLiveStore } from "@/lib/liveStore";
import { PhotoThumb } from "@/components/ui/PhotoThumb";
import { StatusPill } from "@/components/ui/StatusPill";

export function ActivityTab() {
  const target = fieldExecutive.activity.target;
  const { state } = useLiveStore();
  const { month, entries } = state.fieldActivity;

  return (
    <div className="space-y-4">
      <div className="rounded-panel border border-rule bg-card p-3">
        <p className="panel-title">This month</p>
        <p className="mt-1 text-[14px] text-deep">
          <span className="font-mono font-semibold">
            {month.householdsReached} households
          </span>{" "}
          reached ·{" "}
          <span className="font-mono font-semibold">
            {month.conversionPct}%
          </span>{" "}
          conversion
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rule">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{
              width: `${Math.min(100, (month.householdsReached / target) * 100)}%`,
            }}
          />
        </div>
        <p className="mt-1 font-mono text-[11px] text-deep3">
          Target {target} households / month
        </p>
      </div>

      <div>
        <p className="panel-title mb-2">Recent entries</p>
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-panel border border-rule bg-card p-2.5"
            >
              <PhotoThumb size={36} pending={entry.photoPending} />
              <div className="flex-1">
                <p className="text-[12.5px] font-medium text-deep">
                  {entry.type}
                </p>
                <p className="font-mono text-[11px] text-deep3">
                  {entry.date} · {entry.village}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {entry.photoPending ? (
                  <StatusPill label="Photo pending" tone="hold" />
                ) : null}
                {entry.gpsVerified ? (
                  <StatusPill label="GPS verified" tone="verified" />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
