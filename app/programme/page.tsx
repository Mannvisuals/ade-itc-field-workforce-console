"use client";

import { useRequireRole } from "@/lib/session";
import { ProgrammeView } from "@/components/programme/ProgrammeView";

export default function ProgrammePage() {
  const { session, ready } = useRequireRole("programme");

  if (!ready || !session || session.role !== "programme") return null;

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-5">
      <ProgrammeView />
    </main>
  );
}
