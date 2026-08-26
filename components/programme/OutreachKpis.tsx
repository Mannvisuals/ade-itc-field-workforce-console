"use client";

import { Panel } from "@/components/ui/Panel";
import { StatCard } from "@/components/ui/StatCard";
import { buildOutreachKpis } from "@/content/data";
import { useLiveStore } from "@/lib/liveStore";
import { DistrictChart } from "@/components/programme/DistrictChart";

export function OutreachKpis() {
  const { state } = useLiveStore();
  const kpis = buildOutreachKpis(state.outreachStats);

  return (
    <Panel title="Outreach KPIs">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            sub={kpi.sub}
            trend={kpi.trend}
          />
        ))}
      </div>

      <div className="mt-4 border-t border-rule pt-3">
        <p className="panel-title mb-2">Households reached per district</p>
        <DistrictChart />
      </div>
    </Panel>
  );
}
