import { Download } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { DataRow } from "@/components/ui/DataRow";
import { StatusPill, type StatusTone } from "@/components/ui/StatusPill";
import { compliance, irDesk, type ComplianceStatus } from "@/content/data";

const toneForStatus: Record<ComplianceStatus, StatusTone> = {
  filed: "verified",
  due: "hold",
  escalated: "alert",
  expired: "alert",
};

export function Compliance() {
  return (
    <Panel title="Compliance and IR desk" className="h-full">
      <DataRow
        label={`PF ECR · ${compliance.pfEcr.period}`}
        valueNode={
          <span className="flex items-center gap-2">
            <span className="font-mono text-[12px] text-deep3">
              {compliance.pfEcr.note}
            </span>
            <StatusPill
              label={compliance.pfEcr.status}
              tone={toneForStatus[compliance.pfEcr.status]}
            />
          </span>
        }
      />
      <DataRow
        label={`ESIC return · ${compliance.esic.period}`}
        valueNode={
          <span className="flex items-center gap-2">
            <span className="font-mono text-[12px] text-deep3">
              {compliance.esic.note}
            </span>
            <StatusPill
              label={compliance.esic.status}
              tone={toneForStatus[compliance.esic.status]}
            />
          </span>
        }
      />
      <DataRow
        label="Professional tax, 3 states"
        valueNode={
          <span className="flex items-center gap-2 font-mono text-[13px] text-deep">
            {compliance.professionalTax.statesFiled} of{" "}
            {compliance.professionalTax.statesTotal} filed
            <StatusPill
              label={`1 due in ${compliance.professionalTax.dueInDays}d`}
              tone="hold"
            />
          </span>
        }
      />
      <DataRow
        label={`Minimum wage · ${compliance.minimumWage.state} revision`}
        value={`Effective ${compliance.minimumWage.effectiveDate} · applied to ${compliance.minimumWage.appliedToCount} executives`}
      />
      <DataRow
        label="Registers"
        value={`${compliance.registers.join(", ")} generated`}
      />
      <DataRow
        label={`CLRA licence · ${compliance.clra.location}`}
        value={`Renewal in ${compliance.clra.renewalInDays} days`}
      />

      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-panel border border-rule bg-paper px-3 py-2 text-[13px] font-medium text-deep hover:bg-rule/40"
      >
        <Download size={14} />
        Download inspection pack
      </button>

      <div className="mt-4 border-t border-rule pt-3">
        <p className="panel-title mb-2">
          IR desk · {irDesk.openGrievances} open grievances
        </p>
        {irDesk.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 rounded-panel bg-alert/10 px-3 py-2"
          >
            <span className="font-mono text-[12px] text-alert">
              {item.type} · {item.district} district · raised{" "}
              {item.raisedDaysAgo} days ago
            </span>
            <StatusPill label={item.status} tone={toneForStatus[item.status]} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
