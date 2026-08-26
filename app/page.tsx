"use client";

import { useState } from "react";
import { ViewSwitcher, type View } from "@/components/ViewSwitcher";
import { ProgrammeView } from "@/components/programme/ProgrammeView";
import { FieldExecutiveView } from "@/components/field/FieldExecutiveView";

export default function Home() {
  const [view, setView] = useState<View>("programme");

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-5">
      <div className="mb-4 flex justify-end">
        <ViewSwitcher view={view} onChange={setView} />
      </div>

      {view === "programme" ? <ProgrammeView /> : <FieldExecutiveView />}
    </main>
  );
}
