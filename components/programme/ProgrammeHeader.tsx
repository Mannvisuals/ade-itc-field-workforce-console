import { ChevronDown } from "lucide-react";
import { programme } from "@/content/data";

export function ProgrammeHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-[18px] font-semibold text-deep">
          {programme.name}
        </h1>
        <p className="mt-0.5 font-mono text-[12px] text-deep3">
          {programme.staffCount} field executives · {programme.districtCount}{" "}
          districts · {programme.monthLabel}
        </p>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-panel border border-rule bg-card px-3 py-1.5 text-[13px] text-deep"
      >
        {programme.dateLabel}
        <ChevronDown size={14} className="text-deep3" />
      </button>
    </div>
  );
}
