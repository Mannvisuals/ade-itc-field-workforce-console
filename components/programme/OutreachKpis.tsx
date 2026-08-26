import { Panel } from "@/components/ui/Panel";
import { StatCard } from "@/components/ui/StatCard";
import { outreachKpis } from "@/content/data";
import { DistrictChart } from "@/components/programme/DistrictChart";

export function OutreachKpis() {
  return (
    <Panel title="Outreach KPIs">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {outreachKpis.map((kpi) => (
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
