"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Activity as ActivityIcon,
  CalendarCheck,
  Wallet,
  Signal,
  Wifi,
  BatteryFull,
  LogOut,
} from "lucide-react";
import { phoneTabs, fieldExecutive, type PhoneTab } from "@/content/data";
import { useSession } from "@/lib/session";

const TAB_ICONS: Record<PhoneTab["key"], typeof Home> = {
  today: Home,
  activity: ActivityIcon,
  attendance: CalendarCheck,
  money: Wallet,
};

export function PhoneFrame({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: PhoneTab["key"];
  onTabChange: (tab: PhoneTab["key"]) => void;
  children: ReactNode;
}) {
  const { logout } = useSession();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    // Below `sm`, this is a real mobile web app: full-bleed, no bezel. At
    // `sm` and above (presenting on a laptop or tablet) it gets the phone
    // chrome so a client can see it's a distinct mobile surface.
    <div className="w-full shrink-0 bg-paper sm:mx-auto sm:w-[340px] sm:rounded-[42px] sm:bg-deep sm:p-3 sm:shadow-xl">
      <div className="flex h-[100dvh] flex-col overflow-hidden bg-paper sm:h-[700px] sm:rounded-[30px]">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-deep px-5 py-2 font-mono text-[11px] text-white">
          <span>09:41</span>
          <span className="flex items-center gap-1.5 text-white/70">
            <Signal size={12} />
            <Wifi size={12} />
            <BatteryFull size={14} />
          </span>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between border-b border-rule bg-card px-4 py-2">
          <div>
            <p className="text-[12px] font-semibold text-deep">
              {fieldExecutive.name}
            </p>
            <p className="font-mono text-[10px] text-deep3">
              {fieldExecutive.id}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 text-[11px] text-deep3 hover:text-alert"
          >
            <LogOut size={12} />
            Log out
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>

        {/* Tab bar */}
        <div className="grid grid-cols-4 border-t border-rule bg-card">
          {phoneTabs.map((tab) => {
            const Icon = TAB_ICONS[tab.key];
            const active = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                aria-pressed={active}
                onClick={() => onTabChange(tab.key)}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] ${
                  active ? "text-brand" : "text-deep3"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.4 : 2} />
                <span className="leading-tight">{tab.labelEn}</span>
                <span className="leading-tight">{tab.labelHi}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
