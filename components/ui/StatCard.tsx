import { ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "down";
}) {
  return (
    <div className="rounded-panel border border-rule bg-card px-4 py-3">
      <p className="panel-title">{label}</p>
      <p className="stat-value mt-1.5 text-[30px] leading-none">{value}</p>
      <p className="mt-1.5 flex items-center gap-1 text-[12px] text-deep3">
        {trend === "up" ? (
          <ArrowUpRight size={13} className="shrink-0 text-verified" />
        ) : null}
        <span>{sub}</span>
      </p>
    </div>
  );
}
