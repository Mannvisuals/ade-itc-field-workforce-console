import { AlertTriangle } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { issues } from "@/content/data";

export function IssuesStrip() {
  return (
    <Panel title="Issues and escalations">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {issues.map((issue) => (
          <div
            key={issue.label}
            className="flex items-start gap-2 rounded-panel border border-rule bg-paper px-3 py-2.5"
          >
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-action" />
            <div>
              <p className="text-[12.5px] font-medium text-deep">
                {issue.label}
              </p>
              <p className="font-mono text-[11.5px] text-deep3">
                {issue.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
