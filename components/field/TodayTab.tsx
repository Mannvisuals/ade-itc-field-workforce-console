import { CheckCircle2 } from "lucide-react";
import { fieldExecutive } from "@/content/data";
import { PhotoThumb } from "@/components/ui/PhotoThumb";

export function TodayTab() {
  const { name, dateLabel, today } = fieldExecutive;

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
              Checked in {today.checkIn.time}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[11.5px] text-deep3">
            Village {today.checkIn.village} ·{" "}
            {today.checkIn.verified ? "location verified" : "location pending"}
          </p>
        </div>
      </div>

      <div className="rounded-panel border border-rule bg-card p-3">
        <p className="panel-title">Today&apos;s target</p>
        <p className="mt-1 text-[14px] text-deep">
          <span className="font-mono font-semibold">
            {today.target.total} household visits
          </span>{" "}
          · <span className="font-mono">{today.target.done} done</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rule">
          <div
            className="h-full rounded-full bg-verified"
            style={{
              width: `${(today.target.done / today.target.total) * 100}%`,
            }}
          />
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-panel bg-action px-4 py-3 text-center text-[13px] font-semibold text-white"
      >
        {today.logActionLabel}
      </button>

      <div>
        <p className="panel-title mb-2">Logged today</p>
        <div className="space-y-2">
          {today.entries.map((entry, i) => (
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
