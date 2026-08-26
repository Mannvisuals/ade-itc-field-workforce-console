"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserCircle2 } from "lucide-react";
import { programme } from "@/content/data";
import { useSession } from "@/lib/session";

export function ProgrammeHeader() {
  const { session, logout } = useSession();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-[18px] font-semibold text-deep">
          {programme.name}
        </h1>
        <p className="mt-0.5 font-mono text-[12px] text-deep3">
          {programme.staffCount} field executives · {programme.districtCount}{" "}
          districts · {programme.monthLabel}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-panel border border-rule bg-card px-3 py-1.5 text-[13px] text-deep"
        >
          {programme.dateLabel}
          <ChevronDown size={14} className="text-deep3" />
        </button>

        <div className="flex items-center gap-2 rounded-panel border border-rule bg-card px-3 py-1.5">
          <UserCircle2 size={16} className="text-deep3" />
          <span className="text-[12.5px] text-deep">
            {session?.displayName ?? "Programme Admin"}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className="ml-1 text-deep3 hover:text-alert"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
