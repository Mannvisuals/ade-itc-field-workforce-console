"use client";

import { useRequireRole } from "@/lib/session";
import { FieldExecutiveView } from "@/components/field/FieldExecutiveView";

export default function FieldPage() {
  const { session, ready } = useRequireRole("field");

  if (!ready || !session || session.role !== "field") return null;

  return <FieldExecutiveView />;
}
