import { Panel } from "@/components/ui/Panel";
import { DataRow } from "@/components/ui/DataRow";
import { StatusPill } from "@/components/ui/StatusPill";
import { payroll } from "@/content/data";

export function Payroll() {
  return (
    <Panel title="Payroll and finance" className="h-full">
      <DataRow
        label={`Wage run · March (${payroll.executiveCount} executives)`}
        valueNode={
          <span className="flex items-center gap-2">
            <span className="font-mono text-[13px] text-deep">
              {payroll.grossWageLabel}
            </span>
            <StatusPill label={payroll.wageRunStatus} tone="verified" />
          </span>
        }
      />
      <DataRow
        label="Overtime this month"
        valueNode={
          <span className="font-mono text-[13px] text-deep">
            {payroll.overtimeHoursTotal} hrs ·{" "}
            <span className="font-medium text-action">
              {payroll.overtimeHoursUnapproved} hrs unapproved
            </span>
          </span>
        }
      />
      <DataRow
        label={`Advances outstanding · ${payroll.advancesExecutiveCount} executives`}
        value={payroll.advancesOutstandingLabel}
      />
      <DataRow
        label={`Reimbursements pending · ${payroll.reimbursementsPendingCount} claims`}
        valueNode={
          <span className="font-mono text-[13px] text-deep">
            {payroll.reimbursementsPendingLabel}{" "}
            <span className="font-medium text-action">
              · oldest {payroll.reimbursementsOldestDays}d
            </span>
          </span>
        }
      />
      <DataRow label="Next disbursement" value={payroll.nextDisbursementDate} />
    </Panel>
  );
}
