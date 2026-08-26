export type StatusTone = "verified" | "hold" | "alert" | "neutral";

const toneClasses: Record<StatusTone, string> = {
  verified: "bg-verified/10 text-verified",
  hold: "bg-hold/15 text-[#8a6a10]",
  alert: "bg-alert/10 text-alert",
  neutral: "bg-deep3/10 text-deep3",
};

export function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: StatusTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
