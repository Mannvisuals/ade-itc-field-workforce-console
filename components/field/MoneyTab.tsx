import { Download } from "lucide-react";
import { fieldExecutive } from "@/content/data";
import { DataRow } from "@/components/ui/DataRow";
import { StatusPill } from "@/components/ui/StatusPill";

export function MoneyTab() {
  const { money, labels } = fieldExecutive;

  return (
    <div className="space-y-4">
      <div className="rounded-panel border border-rule bg-card p-3">
        <p className="panel-title mb-1">Last salary</p>
        <p className="font-mono text-[14px] font-semibold text-deep">
          {money.lastSalary.month} · {money.lastSalary.amount}
        </p>
        <p className="mt-0.5 font-mono text-[11px] text-deep3">
          Credited {money.lastSalary.creditedDate} · UTR{" "}
          {money.lastSalary.utr}
        </p>
      </div>

      <div className="rounded-panel border border-rule bg-card p-1 px-2">
        <DataRow
          label="Last reimbursement"
          valueNode={
            <span className="flex items-center gap-2">
              <span className="font-mono text-[12.5px] text-deep">
                {money.lastReimbursement.type} · {money.lastReimbursement.amount}
              </span>
              <StatusPill label={money.lastReimbursement.status} tone="verified" />
            </span>
          }
        />
        <DataRow
          label="Pending claim"
          valueNode={
            <span className="flex items-center gap-2">
              <span className="font-mono text-[12.5px] text-deep">
                {money.pendingClaim.type} · {money.pendingClaim.amount}
              </span>
              <StatusPill label="awaiting approval" tone="hold" />
            </span>
          }
        />
        <DataRow
          label="Advance outstanding"
          value={`${money.advance.outstanding} · ${money.advance.instalmentsLeft} instalments left`}
        />
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-panel bg-brand px-4 py-3 text-[13px] font-semibold text-white"
      >
        <Download size={15} />
        {labels.downloadPayslip}
      </button>

      <button
        type="button"
        className="w-full text-center text-[12px] font-medium text-deep3 underline underline-offset-2"
      >
        {labels.raiseQuery}
      </button>
    </div>
  );
}
