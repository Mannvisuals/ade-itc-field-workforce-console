import { Panel } from "@/components/ui/Panel";
import { attendanceToday } from "@/content/data";

const rows: { label: string; value: number; tone: string }[] = [
  { label: "On time", value: attendanceToday.onTime, tone: "text-deep" },
  { label: "Late", value: attendanceToday.late, tone: "text-[#8a6a10]" },
  { label: "Absent", value: attendanceToday.absent, tone: "text-alert" },
  { label: "On leave", value: attendanceToday.onLeave, tone: "text-deep3" },
];

export function AttendanceToday() {
  return (
    <Panel title="Attendance today" className="flex h-full flex-col">
      <p className="stat-value text-[32px] leading-none">
        {attendanceToday.present} of {attendanceToday.total} present
      </p>

      <div className="mt-3 divide-y divide-rule border-t border-rule">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-2"
          >
            <span className="text-[13px] text-deep3">{row.label}</span>
            <span className={`font-mono text-[13px] font-medium ${row.tone}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 rounded-panel bg-hold/15 px-3 py-2 text-[12px] text-[#8a6a10]">
        {attendanceToday.pendingLocationVerification} check-ins pending
        location verification
      </p>
    </Panel>
  );
}
