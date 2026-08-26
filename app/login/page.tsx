"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, ShieldCheck, Smartphone } from "lucide-react";
import { useSession } from "@/lib/session";
import { programme, demoAccounts } from "@/content/data";

export default function LoginPage() {
  const { session, ready, login } = useSession();
  const router = useRouter();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Already signed in: skip the form and go straight to the right view.
  useEffect(() => {
    if (ready && session) {
      router.replace(session.role === "programme" ? "/programme" : "/field");
    }
  }, [ready, session, router]);

  function routeForRole(role: "programme" | "field") {
    router.push(role === "programme" ? "/programme" : "/field");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const account = demoAccounts.find(
      (a) => a.loginId.toLowerCase() === loginId.trim().toLowerCase()
    );
    if (!account || account.password !== password) {
      setError("That ID and password don't match a known account.");
      return;
    }
    login(loginId, password);
    routeForRole(account.role);
  }

  function quickLogin(role: "programme" | "field") {
    const account = demoAccounts.find((a) => a.role === role);
    if (!account) return;
    login(account.loginId, account.password);
    routeForRole(role);
  }

  if (ready && session) return null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="panel-title">{programme.name}</p>
          <h1 className="mt-1 text-[20px] font-semibold text-deep">
            Field Workforce Console
          </h1>
        </div>

        <div className="rounded-panel border border-rule bg-card p-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="loginId"
                className="mb-1 block text-[12px] font-medium text-deep3"
              >
                Login ID
              </label>
              <input
                id="loginId"
                type="text"
                autoComplete="username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="admin or employee ID"
                className="w-full rounded-panel border border-rule bg-paper px-3 py-2 text-[13px] text-deep outline-none focus:border-brand"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[12px] font-medium text-deep3"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-panel border border-rule bg-paper px-3 py-2 text-[13px] text-deep outline-none focus:border-brand"
              />
            </div>

            {error ? (
              <p className="text-[12px] text-alert">{error}</p>
            ) : null}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-panel bg-brand px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-dk"
            >
              <LogIn size={15} />
              Sign in
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-rule" />
            <span className="text-[11px] uppercase tracking-wide text-deep3">
              Demo access
            </span>
            <div className="h-px flex-1 bg-rule" />
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => quickLogin("programme")}
              className="flex w-full items-center gap-3 rounded-panel border border-rule bg-paper px-3 py-2.5 text-left hover:bg-rule/40"
            >
              <ShieldCheck size={16} className="shrink-0 text-brand" />
              <span>
                <span className="block text-[12.5px] font-medium text-deep">
                  Continue as Programme Admin
                </span>
                <span className="block text-[11px] text-deep3">
                  Programme view, districts and payroll
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => quickLogin("field")}
              className="flex w-full items-center gap-3 rounded-panel border border-rule bg-paper px-3 py-2.5 text-left hover:bg-rule/40"
            >
              <Smartphone size={16} className="shrink-0 text-brand" />
              <span>
                <span className="block text-[12.5px] font-medium text-deep">
                  Continue as Sunita Devi
                </span>
                <span className="block text-[11px] text-deep3">
                  Field executive, Sagar district
                </span>
              </span>
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-deep3">
          Demonstration build. Not connected to a real identity system.
        </p>
      </div>
    </main>
  );
}
