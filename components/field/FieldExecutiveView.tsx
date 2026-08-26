"use client";

import { useState } from "react";
import { PhoneFrame } from "@/components/field/PhoneFrame";
import { TodayTab } from "@/components/field/TodayTab";
import { ActivityTab } from "@/components/field/ActivityTab";
import { AttendanceTab } from "@/components/field/AttendanceTab";
import { MoneyTab } from "@/components/field/MoneyTab";
import { fieldExecutive, type PhoneTab } from "@/content/data";

const TAB_CONTENT: Record<PhoneTab["key"], () => JSX.Element> = {
  today: TodayTab,
  activity: ActivityTab,
  attendance: AttendanceTab,
  money: MoneyTab,
};

const EXPLAINERS: { tab: PhoneTab["key"]; text: string }[] = [
  {
    tab: "today",
    text: "Checks in with a selfie and location, sees today's household visit target, and logs new activity as it happens.",
  },
  {
    tab: "activity",
    text: "A running log of the month's outreach: every visit tied to a photo and a GPS-verified location, so field activity can be trusted without a supervisor present.",
  },
  {
    tab: "attendance",
    text: "Attendance, overtime and leave balance for the month, at a glance, with any unverified day flagged.",
  },
  {
    tab: "money",
    text: "Salary, reimbursements and advances, with a payslip available on demand. No waiting on the programme office for a status update.",
  },
];

export function FieldExecutiveView() {
  const [activeTab, setActiveTab] = useState<PhoneTab["key"]>("today");
  const ActiveContent = TAB_CONTENT[activeTab];

  return (
    <div className="flex flex-col items-center gap-10 py-4 lg:flex-row lg:items-start lg:justify-center">
      <PhoneFrame activeTab={activeTab} onTabChange={setActiveTab}>
        <ActiveContent />
      </PhoneFrame>

      <div className="max-w-sm">
        <p className="panel-title">Field executive view</p>
        <h2 className="mt-1 text-[18px] font-semibold text-deep">
          {fieldExecutive.name}
        </h2>
        <p className="font-mono text-[12px] text-deep3">
          {fieldExecutive.id} · {fieldExecutive.district}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-deep3">
          This is what a field executive carries in their pocket: the same
          system the programme view reports on, from the other side. Switch
          between the four tabs below to see what {fieldExecutive.name.split(" ")[0]}{" "}
          sees each day.
        </p>

        <div className="mt-5 space-y-3 border-t border-rule pt-4">
          {EXPLAINERS.map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => setActiveTab(item.tab)}
              className={`block w-full rounded-panel border p-3 text-left transition-colors ${
                activeTab === item.tab
                  ? "border-brand bg-brand/5"
                  : "border-rule bg-card hover:bg-paper"
              }`}
            >
              <p className="text-[12.5px] font-semibold capitalize text-deep">
                {item.tab}
              </p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-deep3">
                {item.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
