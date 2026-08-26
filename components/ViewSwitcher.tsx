"use client";

export type View = "programme" | "field";

export function ViewSwitcher({
  view,
  onChange,
}: {
  view: View;
  onChange: (view: View) => void;
}) {
  return (
    <div className="inline-flex rounded-panel border border-rule bg-card p-0.5">
      <button
        type="button"
        aria-pressed={view === "programme"}
        onClick={() => onChange("programme")}
        className={`rounded-[4px] px-3 py-1.5 text-[13px] font-medium transition-colors ${
          view === "programme"
            ? "bg-deep text-white"
            : "text-deep3 hover:text-deep"
        }`}
      >
        Programme view
      </button>
      <button
        type="button"
        aria-pressed={view === "field"}
        onClick={() => onChange("field")}
        className={`rounded-[4px] px-3 py-1.5 text-[13px] font-medium transition-colors ${
          view === "field"
            ? "bg-deep text-white"
            : "text-deep3 hover:text-deep"
        }`}
      >
        Field executive view
      </button>
    </div>
  );
}
