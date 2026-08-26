"use client";

import { useState } from "react";
import { ViewSwitcher, type View } from "@/components/ViewSwitcher";
import { ProgrammeView } from "@/components/programme/ProgrammeView";

export default function Home() {
  const [view, setView] = useState<View>("programme");

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-5">
      <div className="mb-4 flex justify-end">
        <ViewSwitcher view={view} onChange={setView} />
      </div>

      {view === "programme" ? (
        <ProgrammeView />
      ) : (
        <div className="flex min-h-[400px] items-center justify-center rounded-panel border border-rule bg-card">
          <p className="text-[13px] text-deep3">
            Field executive view is built in the next step.
          </p>
        </div>
      )}
    </main>
  );
}
