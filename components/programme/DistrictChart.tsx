"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { districtOutreach, districtOutreachTarget } from "@/content/data";

export function DistrictChart() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={districtOutreach}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#D8DDE0" strokeDasharray="0" opacity={0.6} />
          <XAxis
            dataKey="district"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#5B7383", fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#5B7383", fontSize: 11 }}
            width={40}
          />
          <ReferenceLine
            y={districtOutreachTarget}
            stroke="#5B7383"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          <Bar dataKey="households" fill="#2AA8E0" radius={[3, 3, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
