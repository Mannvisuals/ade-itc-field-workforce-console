import { ProgrammeHeader } from "@/components/programme/ProgrammeHeader";
import { DeploymentMap } from "@/components/programme/DeploymentMap";
import { AttendanceToday } from "@/components/programme/AttendanceToday";
import { OutreachKpis } from "@/components/programme/OutreachKpis";
import { Payroll } from "@/components/programme/Payroll";
import { Compliance } from "@/components/programme/Compliance";
import { IssuesStrip } from "@/components/programme/IssuesStrip";

export function ProgrammeView() {
  return (
    <div className="space-y-4">
      <ProgrammeHeader />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DeploymentMap />
        </div>
        <div>
          <AttendanceToday />
        </div>
      </div>

      <OutreachKpis />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Payroll />
        <Compliance />
      </div>

      <IssuesStrip />
    </div>
  );
}
