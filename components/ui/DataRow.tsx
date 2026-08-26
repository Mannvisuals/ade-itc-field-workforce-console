import { ReactNode } from "react";

export function DataRow({
  label,
  value,
  attention = false,
  valueNode,
}: {
  label: string;
  value?: string;
  attention?: boolean;
  valueNode?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-rule py-2 last:border-b-0">
      <span className="text-[13px] text-deep3">{label}</span>
      {valueNode ? (
        valueNode
      ) : (
        <span
          className={`font-mono text-[13px] ${
            attention ? "font-medium text-action" : "text-deep"
          }`}
        >
          {value}
        </span>
      )}
    </div>
  );
}
