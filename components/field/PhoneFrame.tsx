"use client";

import { ReactNode } from "react";
import { Home, Activity as ActivityIcon, CalendarCheck, Wallet } from "lucide-react";
import { phoneTabs, type PhoneTab } from "@/content/data";

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
  return (
    <div className="mx-auto w-[340px] shrink-0 rounded-[42px] bg-deep p-3 shadow-xl">
      <div className="flex h-[700px] flex-col overflow-hidden rounded-[30px] bg-paper">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-deep px-5 py-2 font-mono text-[11px] text-white">
          <span>09:41</span>
          <span className="tracking-wider text-white/70">•••• ▲ ▮▮▮</span>
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
