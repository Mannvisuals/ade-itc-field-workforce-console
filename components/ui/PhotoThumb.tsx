import { Camera, Clock } from "lucide-react";

export function PhotoThumb({
  pending = false,
  size = 40,
}: {
  pending?: boolean;
  size?: number;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[4px] border ${
        pending
          ? "border-hold/60 bg-hold/10"
          : "border-rule bg-deep3/10"
      }`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {pending ? (
        <Clock size={size * 0.42} className="text-[#8a6a10]" />
      ) : (
        <Camera size={size * 0.42} className="text-deep3" />
      )}
    </div>
  );
}
