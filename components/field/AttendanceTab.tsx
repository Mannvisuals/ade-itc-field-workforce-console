import { fieldExecutive } from "@/content/data";

const CELL_TONE: Record<string, string> = {
  P: "bg-verified/15 text-verified",
  A: "bg-alert/15 text-alert",
  L: "bg-hold/20 text-[#8a6a10]",
  "-": "bg-rule/50 text-deep3",
};

export function AttendanceTab() {
  const { attendance } = fieldExecutive;

  return (
    <div className="space-y-4">
      <div className="rounded-panel border border-rule bg-card p-3">
        <p className="panel-title">March summary</p>
        <p className="mt-1 font-mono text-[14px] text-deep">
          {attendance.march.present} present · {attendance.march.leave} leave
          · {attendance.march.absent} absent
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-panel border border-rule bg-card p-3">
          <p className="panel-title">Overtime</p>
          <p className="mt-1 font-mono text-[16px] font-semibold text-deep">
            {attendance.overtimeHours} hrs
          </p>
        </div>
        <div className="rounded-panel border border-rule bg-card p-3">
          <p className="panel-title">Holidays left</p>
          <p className="mt-1 font-mono text-[12.5px] text-deep">
            Casual {attendance.holidaysRemaining.casual} · Earned{" "}
            {attendance.holidaysRemaining.earned}
          </p>
        </div>
      </div>

      <div className="rounded-panel border border-rule bg-card p-3">
        <p className="panel-title mb-2">March</p>
        <div className="grid grid-cols-7 gap-1.5">
          {attendance.monthGrid.map((status, i) => {
            const isToday = i === attendance.todayIndex;
            const isUnverified = i === attendance.unverifiedCellIndex;
            return (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-[4px] font-mono text-[10px] font-medium ${
                  isUnverified ? "bg-hold/25 text-[#8a6a10]" : CELL_TONE[status]
                } ${isToday ? "ring-2 ring-brand ring-offset-1" : ""}`}
                title={`Day ${i + 1}: ${status}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        <p className="mt-2 rounded-panel bg-hold/15 px-2.5 py-1.5 text-[11px] text-[#8a6a10]">
          Day {attendance.unverifiedCellIndex + 1}: {attendance.unverifiedNote}
        </p>
      </div>
    </div>
  );
}
