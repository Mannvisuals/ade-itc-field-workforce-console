"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import {
  fieldPins,
  districtLabels,
  mapCounts,
  type FieldPin,
  type PinStatus,
} from "@/content/data";

const STATUS_COLOR: Record<PinStatus, string> = {
  in_boundary: "#5AB552",
  outside_boundary: "#F6C445",
  not_checked_in: "#9AA7AE",
  no_signal: "#D14343",
};

const STATUS_LABEL: Record<PinStatus, string> = {
  in_boundary: "Checked in, in boundary",
  outside_boundary: "Checked in, outside boundary",
  not_checked_in: "Not checked in",
  no_signal: "No signal (4h+)",
};

// District cluster centres, used only to place soft grouping rings behind the pins.
const clusters: { name: string; cx: number; cy: number; rx: number; ry: number }[] = [
  { name: "Bhopal", cx: 233, cy: 152, rx: 62, ry: 48 },
  { name: "Sagar", cx: 540, cy: 122, rx: 68, ry: 48 },
  { name: "Vidisha", cx: 388, cy: 255, rx: 78, ry: 55 },
  { name: "Damoh", cx: 610, cy: 218, rx: 58, ry: 48 },
  { name: "Betul", cx: 205, cy: 358, rx: 68, ry: 48 },
  { name: "Chhatarpur", cx: 628, cy: 390, rx: 70, ry: 48 },
];

export function DeploymentMap() {
  const [hovered, setHovered] = useState<FieldPin | null>(null);

  return (
    <Panel title="Live deployment map" className="h-full">
      <div className="relative">
        <svg
          viewBox="0 0 800 500"
          className="w-full"
          role="img"
          aria-label="Field executive deployment map across six districts"
        >
          {/* Abstract state outline, not a real map */}
          <path
            d="M120,180 C100,120 160,60 260,50 C360,40 420,70 480,50
               C560,30 650,60 680,130 C710,200 690,260 720,320
               C750,380 700,440 620,450 C540,460 480,430 400,445
               C320,460 220,455 160,410 C100,365 90,300 110,250
               C120,220 105,205 120,180 Z"
            fill="#F2F4F5"
            stroke="#D8DDE0"
            strokeWidth={1.5}
          />

          {/* Soft district groupings */}
          {clusters.map((c) => (
            <ellipse
              key={c.name}
              cx={c.cx}
              cy={c.cy}
              rx={c.rx}
              ry={c.ry}
              fill="none"
              stroke="#D8DDE0"
              strokeDasharray="3 4"
              strokeWidth={1}
            />
          ))}

          {/* District labels */}
          {districtLabels.map((d) => (
            <text
              key={d.name}
              x={d.labelX}
              y={d.labelY}
              className="fill-deep3"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {d.name}
            </text>
          ))}

          {/* Pins */}
          {fieldPins.map((pin) => {
            const isHovered = hovered?.id === pin.id;
            return (
              <g
                key={pin.id}
                onMouseEnter={() => setHovered(pin)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={isHovered ? 7 : 5}
                  fill={STATUS_COLOR[pin.status]}
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                  className="transition-all"
                />
                {pin.status === "no_signal" ? (
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={10}
                    fill="none"
                    stroke={STATUS_COLOR[pin.status]}
                    strokeWidth={1}
                    opacity={0.5}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        {hovered ? (
          <div
            className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-panel border border-rule bg-deep px-3 py-2.5 text-white shadow-lg"
            style={{
              left: `${(hovered.x / 800) * 100}%`,
              top: `${(hovered.y / 500) * 100}%`,
            }}
          >
            <p className="text-[13px] font-semibold">{hovered.name}</p>
            <p className="mt-0.5 font-mono text-[11px] text-white/70">
              {hovered.id} · {hovered.village}, {hovered.district}
            </p>
            <div className="mt-1.5 space-y-0.5 border-t border-white/15 pt-1.5 font-mono text-[11px] text-white/85">
              <p>
                Check-in:{" "}
                {hovered.checkInTime ? hovered.checkInTime : "Not checked in"}
              </p>
              <p>{hovered.lastActivity}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-rule pt-3">
        {(Object.keys(STATUS_LABEL) as PinStatus[]).map((status) => (
          <span
            key={status}
            className="flex items-center gap-1.5 text-[12px] text-deep3"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: STATUS_COLOR[status] }}
            />
            {STATUS_LABEL[status]}
            <span className="font-mono text-deep">
              {status === "in_boundary" && mapCounts.inBoundary}
              {status === "outside_boundary" && mapCounts.outsideBoundary}
              {status === "not_checked_in" && mapCounts.notCheckedIn}
              {status === "no_signal" && mapCounts.noSignal}
            </span>
          </span>
        ))}
      </div>
    </Panel>
  );
}
