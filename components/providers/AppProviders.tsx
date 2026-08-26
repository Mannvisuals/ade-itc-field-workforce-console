"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/lib/session";
import { LiveStoreProvider } from "@/lib/liveStore";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LiveStoreProvider>{children}</LiveStoreProvider>
    </SessionProvider>
  );
}
