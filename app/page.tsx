"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";

// Entry point: routes to the signed-in user's view, or to the login screen.
export default function Home() {
  const { session, ready } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    router.replace(session ? (session.role === "programme" ? "/programme" : "/field") : "/login");
  }, [ready, session, router]);

  return null;
}
