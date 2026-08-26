"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { demoAccounts, type DemoAccount } from "@/content/data";

const SESSION_KEY = "fwc_session";

export interface Session {
  role: DemoAccount["role"];
  loginId: string;
  displayName: string;
}

interface SessionContextValue {
  session: Session | null;
  // True once sessionStorage has been checked on mount. Route guards should
  // wait for this before redirecting, otherwise a refresh would bounce a
  // logged-in user to /login for a frame before the session loads.
  ready: boolean;
  login: (loginId: string, password: string) => boolean;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {
      // Private browsing or storage blocked: fine, just start logged out.
    }
    setReady(true);
  }, []);

  function login(loginId: string, password: string): boolean {
    const account = demoAccounts.find(
      (a) =>
        a.loginId.toLowerCase() === loginId.trim().toLowerCase() &&
        a.password === password
    );
    if (!account) return false;

    const next: Session = {
      role: account.role,
      loginId: account.loginId,
      displayName: account.displayName,
    };
    setSession(next);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    return true;
  }

  function logout() {
    setSession(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <SessionContext.Provider value={{ session, ready, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

// Route guard for /programme and /field. Redirects to /login when there is
// no session, or to the correct view when a logged-in user lands on the
// wrong one. Pages should render nothing until `ready` is true and the role
// matches, to avoid a flash of the wrong view.
export function useRequireRole(role: DemoAccount["role"]) {
  const { session, ready } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
    } else if (session.role !== role) {
      router.replace(session.role === "programme" ? "/programme" : "/field");
    }
  }, [ready, session, role, router]);

  return { session, ready };
}
