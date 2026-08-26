import { fieldExecutive } from "@/content/data";
import { PhotoThumb } from "@/components/ui/PhotoThumb";
import { StatusPill } from "@/components/ui/StatusPill";

export function ActivityTab() {
  const { activity } = fieldExecutive;

  return (
    <div className="space-y-4">
      <div className="rounded-panel border border-rule bg-card p-3">
        <p className="panel-title">This month</p>
        <p className="mt-1 text-[14px] text-deep">
          <span className="font-mono font-semibold">
            {activity.month.householdsReached} households
          </span>{" "}
          reached ·{" "}
          <span className="font-mono font-semibold">
            {activity.month.conversionPct}%
          </span>{" "}
          conversion
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rule">
          <div
            className="h-full rounded-full bg-brand"
            style={{
              width: `${Math.min(
                100,
                (activity.month.householdsReached / activity.target) * 100
              )}%`,
            }}
          />
        </div>
        <p className="mt-1 font-mono text-[11px] text-deep3">
          Target {activity.target} households / month
        </p>
      </div>

      <div>
        <p className="panel-title mb-2">Recent entries</p>
        <div className="space-y-2">
          {activity.entries.map((entry, i) => (
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
