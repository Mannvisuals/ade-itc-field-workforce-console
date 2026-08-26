// All mock data for the Field Workforce Console demo.
// Nothing in the components should hardcode a number, name or status: it all lives here.
// This is a demonstration build. Nothing here is connected to a real backend.
//
// Some of the slices below are "live baseline": they seed the client-side live
// store (lib/liveStore.tsx) on first load, and from then on the store, not this
// file, is the source of truth for them. They are marked as such below. That
// store is synced across browser tabs on the same machine via BroadcastChannel,
// so a check-in or activity logged on /field shows up on /programme in another
// tab. There is no server and no persistence beyond the open tabs: closing every
// tab resets state back to the baseline defined here.

// ---------------------------------------------------------------------------
// Programme
// ---------------------------------------------------------------------------

export const programme = {
  name: "Disha Field Programme",
  staffCount: 55,
  districtCount: 6,
  monthLabel: "March 2026",
  dateLabel: "Today, 12 March 2026",
};

// ---------------------------------------------------------------------------
// A1. Live deployment map (live baseline: fieldPins)
// ---------------------------------------------------------------------------

export type PinStatus =
  | "in_boundary"
  | "outside_boundary"
  | "not_checked_in"
  | "no_signal";

export interface FieldPin {
  id: string;
  name: string;
  village: string;
  district: string;
  x: number;
  y: number;
  status: PinStatus;
  checkInTime: string | null;
  lastActivity: string;
}

export interface DistrictLabel {
  name: string;
  labelX: number;
  labelY: number;
}

// Label anchors for the six district clusters on the abstract SVG map.
export const districtLabels: DistrictLabel[] = [
  { name: "Bhopal", labelX: 205, labelY: 108 },
  { name: "Sagar", labelX: 540, labelY: 60 },
  { name: "Vidisha", labelX: 355, labelY: 320 },
  { name: "Damoh", labelX: 640, labelY: 172 },
  { name: "Betul", labelX: 170, labelY: 420 },
  { name: "Chhatarpur", labelX: 600, labelY: 445 },
];

export function countPinsByStatus(pins: FieldPin[]) {
  const counts: Record<PinStatus, number> = {
    in_boundary: 0,
    outside_boundary: 0,
    not_checked_in: 0,
    no_signal: 0,
  };
  for (const pin of pins) counts[pin.status] += 1;
  return counts;
}

// FE-MP-0284 (Sunita Devi) is the demo field-executive login. Her pin here is
// the same record her phone view reads and writes, not a separate character:
// logging an activity on /field updates this pin live.
export const fieldPinsBaseline: FieldPin[] = [
  { id: "FE-MP-0103", name: "Naveen Rajput", village: "Bamhori", district: "Bhopal", x: 207, y: 143, status: "in_boundary", checkInTime: "09:34", lastActivity: "Enrolment logged 12:27" },
  { id: "FE-MP-0106", name: "Rakesh Dubey", village: "Sehatganj", district: "Bhopal", x: 224, y: 141, status: "in_boundary", checkInTime: "08:01", lastActivity: "Household visit logged 10:22" },
  { id: "FE-MP-0109", name: "Sarita Yadav", village: "Kolar Kalan", district: "Bhopal", x: 235, y: 174, status: "in_boundary", checkInTime: "09:34", lastActivity: "Household visit logged 10:28" },
  { id: "FE-MP-0112", name: "Rakesh Lodhi", village: "Bagsevania", district: "Bhopal", x: 210, y: 145, status: "in_boundary", checkInTime: "09:53", lastActivity: "Household visit logged 10:17" },
  { id: "FE-MP-0115", name: "Sandeep Sharma", village: "Neelbad", district: "Bhopal", x: 264, y: 165, status: "in_boundary", checkInTime: "09:29", lastActivity: "Follow-up logged 12:54" },
  { id: "FE-MP-0118", name: "Ashok Thakur", village: "Ratanpur", district: "Bhopal", x: 220, y: 142, status: "in_boundary", checkInTime: "09:56", lastActivity: "Follow-up logged 12:06" },
  { id: "FE-MP-0121", name: "Mahesh Mishra", village: "Chandanpura", district: "Bhopal", x: 207, y: 173, status: "in_boundary", checkInTime: "09:46", lastActivity: "Group session logged 11:20" },
  { id: "FE-MP-0124", name: "Pooja Mishra", village: "Islampur", district: "Bhopal", x: 273, y: 179, status: "in_boundary", checkInTime: "09:03", lastActivity: "Group session logged 11:12" },
  { id: "FE-MP-0127", name: "Deepak Verma", village: "Barkheda", district: "Bhopal", x: 203, y: 158, status: "not_checked_in", checkInTime: null, lastActivity: "No activity logged" },
  { id: "FE-MP-0130", name: "Meena Kori", village: "Gunga", district: "Bhopal", x: 237, y: 119, status: "in_boundary", checkInTime: "08:48", lastActivity: "Household visit logged 10:51" },

  { id: "FE-MP-0284", name: "Sunita Devi", village: "Rehli", district: "Sagar", x: 558, y: 140, status: "in_boundary", checkInTime: "09:12", lastActivity: "Group session logged 11:40" },
  { id: "FE-MP-0136", name: "Manju Jatav", village: "Banda", district: "Sagar", x: 556, y: 83, status: "in_boundary", checkInTime: "08:41", lastActivity: "Group session logged 11:17" },
  { id: "FE-MP-0139", name: "Sanjay Verma", village: "Khurai", district: "Sagar", x: 564, y: 147, status: "in_boundary", checkInTime: "08:26", lastActivity: "Group session logged 10:49" },
  { id: "FE-MP-0142", name: "Meena Kori", village: "Deori", district: "Sagar", x: 519, y: 152, status: "outside_boundary", checkInTime: "09:10", lastActivity: "Group session logged 12:11" },
  { id: "FE-MP-0145", name: "Arun Prajapati", village: "Malthone", district: "Sagar", x: 596, y: 137, status: "in_boundary", checkInTime: "08:53", lastActivity: "Enrolment logged 10:37" },
  { id: "FE-MP-0148", name: "Dinesh Dubey", village: "Shahgarh", district: "Sagar", x: 557, y: 99, status: "in_boundary", checkInTime: "08:56", lastActivity: "Household visit logged 09:20" },
  { id: "FE-MP-0151", name: "Mahesh Lodhi", village: "Kesli", district: "Sagar", x: 541, y: 139, status: "in_boundary", checkInTime: "09:29", lastActivity: "Enrolment logged 10:04" },
  { id: "FE-MP-0154", name: "Harish Ahirwar", village: "Gaurjhamar", district: "Sagar", x: 530, y: 134, status: "in_boundary", checkInTime: "09:46", lastActivity: "Enrolment logged 12:16" },
  { id: "FE-MP-0157", name: "Ramesh Patel", village: "Rahatgarh", district: "Sagar", x: 509, y: 140, status: "in_boundary", checkInTime: "08:00", lastActivity: "Enrolment logged 09:03" },
  { id: "FE-MP-0160", name: "Ajay Vishwakarma", village: "Surkhi", district: "Sagar", x: 517, y: 107, status: "in_boundary", checkInTime: "08:54", lastActivity: "Enrolment logged 09:43" },

  { id: "FE-MP-0163", name: "Kavita Lodhi", village: "Basoda", district: "Vidisha", x: 384, y: 282, status: "in_boundary", checkInTime: "08:58", lastActivity: "Household visit logged 09:55" },
  { id: "FE-MP-0166", name: "Dinesh Mishra", village: "Kurwai", district: "Vidisha", x: 327, y: 255, status: "outside_boundary", checkInTime: "08:16", lastActivity: "Group session logged 09:40" },
  { id: "FE-MP-0169", name: "Meena Yadav", village: "Lateri", district: "Vidisha", x: 421, y: 263, status: "in_boundary", checkInTime: "09:06", lastActivity: "Follow-up logged 12:48" },
  { id: "FE-MP-0172", name: "Mahesh Tiwari", village: "Sironj", district: "Vidisha", x: 343, y: 254, status: "in_boundary", checkInTime: "09:09", lastActivity: "Household visit logged 10:13" },
  { id: "FE-MP-0175", name: "Sunil Sharma", village: "Gyaraspur", district: "Vidisha", x: 394, y: 212, status: "in_boundary", checkInTime: "08:25", lastActivity: "Group session logged 11:49" },
  { id: "FE-MP-0178", name: "Renu Lodhi", village: "Nateran", district: "Vidisha", x: 360, y: 290, status: "not_checked_in", checkInTime: null, lastActivity: "No check-in for 2 days" },
  { id: "FE-MP-0181", name: "Pradeep Sahu", village: "Pathari", district: "Vidisha", x: 373, y: 234, status: "in_boundary", checkInTime: "09:00", lastActivity: "Enrolment logged 12:51" },
  { id: "FE-MP-0184", name: "Rajesh Gond", village: "Tyonda", district: "Vidisha", x: 415, y: 247, status: "in_boundary", checkInTime: "09:06", lastActivity: "Group session logged 12:11" },
  { id: "FE-MP-0187", name: "Rekha Dubey", village: "Ganjbasoda", district: "Vidisha", x: 441, y: 242, status: "in_boundary", checkInTime: "09:27", lastActivity: "Enrolment logged 10:56" },

  { id: "FE-MP-0190", name: "Anita Thakur", village: "Hatta", district: "Damoh", x: 582, y: 218, status: "in_boundary", checkInTime: "09:10", lastActivity: "Enrolment logged 11:28" },
  { id: "FE-MP-0193", name: "Pooja Jatav", village: "Patera", district: "Damoh", x: 597, y: 190, status: "in_boundary", checkInTime: "09:01", lastActivity: "Household visit logged 12:26" },
  { id: "FE-MP-0196", name: "Anita Ahirwar", village: "Jabera", district: "Damoh", x: 608, y: 205, status: "in_boundary", checkInTime: "08:57", lastActivity: "Follow-up logged 10:19" },
  { id: "FE-MP-0199", name: "Pradeep Patel", village: "Tendukheda", district: "Damoh", x: 626, y: 196, status: "in_boundary", checkInTime: "08:19", lastActivity: "Follow-up logged 10:44" },
  { id: "FE-MP-0202", name: "Vinod Sahu", village: "Batiyagarh", district: "Damoh", x: 593, y: 210, status: "in_boundary", checkInTime: "09:48", lastActivity: "Group session logged 11:13" },
  { id: "FE-MP-0205", name: "Naveen Rajput", village: "Padariya", district: "Damoh", x: 601, y: 265, status: "in_boundary", checkInTime: "09:53", lastActivity: "Household visit logged 10:49" },
  { id: "FE-MP-0208", name: "Harish Mishra", village: "Nohta", district: "Damoh", x: 633, y: 230, status: "no_signal", checkInTime: "08:08", lastActivity: "Last location 09:40, no signal for 4h 20m" },
  { id: "FE-MP-0211", name: "Arun Rajput", village: "Barodiya Kalan", district: "Damoh", x: 631, y: 214, status: "in_boundary", checkInTime: "08:29", lastActivity: "Household visit logged 10:08" },
  { id: "FE-MP-0214", name: "Vijay Kushwaha", village: "Singhpur", district: "Damoh", x: 598, y: 217, status: "in_boundary", checkInTime: "08:15", lastActivity: "Follow-up logged 10:55" },

  { id: "FE-MP-0217", name: "Rakesh Yadav", village: "Multai", district: "Betul", x: 203, y: 385, status: "in_boundary", checkInTime: "08:51", lastActivity: "Enrolment logged 10:17" },
  { id: "FE-MP-0220", name: "Sandeep Jatav", village: "Athner", district: "Betul", x: 202, y: 377, status: "in_boundary", checkInTime: "08:51", lastActivity: "Enrolment logged 10:41" },
  { id: "FE-MP-0223", name: "Anil Sharma", village: "Bhainsdehi", district: "Betul", x: 211, y: 376, status: "not_checked_in", checkInTime: null, lastActivity: "No activity logged" },
  { id: "FE-MP-0226", name: "Geeta Kori", village: "Chicholi", district: "Betul", x: 206, y: 339, status: "in_boundary", checkInTime: "09:38", lastActivity: "Household visit logged 12:02" },
  { id: "FE-MP-0229", name: "Sunil Lodhi", village: "Ghoradongri", district: "Betul", x: 208, y: 342, status: "in_boundary", checkInTime: "08:47", lastActivity: "Follow-up visit logged 11:05" },
  { id: "FE-MP-0232", name: "Sandeep Sahu", village: "Shahpur", district: "Betul", x: 169, y: 339, status: "in_boundary", checkInTime: "08:25", lastActivity: "Enrolment logged 10:47" },
  { id: "FE-MP-0235", name: "Ajay Chauhan", village: "Amla", district: "Betul", x: 171, y: 377, status: "in_boundary", checkInTime: "09:13", lastActivity: "Follow-up logged 11:21" },
  { id: "FE-MP-0238", name: "Vijay Kushwaha", village: "Prabhat Pattan", district: "Betul", x: 254, y: 340, status: "in_boundary", checkInTime: "08:45", lastActivity: "Follow-up logged 11:16" },

  { id: "FE-MP-0241", name: "Rakesh Jatav", village: "Bijawar", district: "Chhatarpur", x: 625, y: 370, status: "in_boundary", checkInTime: "08:04", lastActivity: "Enrolment logged 09:10" },
  { id: "FE-MP-0244", name: "Rajesh Lodhi", village: "Naugaon", district: "Chhatarpur", x: 590, y: 419, status: "in_boundary", checkInTime: "08:59", lastActivity: "Group session logged 09:04" },
  { id: "FE-MP-0247", name: "Anil Verma", village: "Laundi", district: "Chhatarpur", x: 593, y: 404, status: "in_boundary", checkInTime: "08:55", lastActivity: "Enrolment logged 09:17" },
  { id: "FE-MP-0250", name: "Vijay Jatav", village: "Bakswaha", district: "Chhatarpur", x: 654, y: 381, status: "in_boundary", checkInTime: "08:30", lastActivity: "Enrolment logged 11:00" },
  { id: "FE-MP-0253", name: "Rajesh Thakur", village: "Rajnagar", district: "Chhatarpur", x: 611, y: 361, status: "in_boundary", checkInTime: "08:44", lastActivity: "Enrolment logged 09:26" },
  { id: "FE-MP-0256", name: "Ashok Kushwaha", village: "Ghuwara", district: "Chhatarpur", x: 666, y: 418, status: "in_boundary", checkInTime: "08:58", lastActivity: "Follow-up logged 10:50" },
  { id: "FE-MP-0259", name: "Sarita Chauhan", village: "Badamalhera", district: "Chhatarpur", x: 650, y: 379, status: "outside_boundary", checkInTime: "08:21", lastActivity: "Group session logged 11:55" },
  { id: "FE-MP-0262", name: "Radha Vishwakarma", village: "Buxwaha", district: "Chhatarpur", x: 658, y: 388, status: "in_boundary", checkInTime: "09:09", lastActivity: "Enrolment logged 10:08" },
  { id: "FE-MP-0265", name: "Rakesh Rajput", village: "Nowgong", district: "Chhatarpur", x: 623, y: 361, status: "outside_boundary", checkInTime: "08:34", lastActivity: "Group session logged 09:36" },
];

// ---------------------------------------------------------------------------
// A2. Attendance today (static)
// ---------------------------------------------------------------------------

export const attendanceToday = {
  present: 51,
  total: 55,
  onTime: 44,
  late: 7,
  absent: 3,
  onLeave: 1,
  pendingLocationVerification: 4,
};

// ---------------------------------------------------------------------------
// A3. Outreach KPIs (live baseline: outreachStats, districtOutreach)
// ---------------------------------------------------------------------------

export interface OutreachKpi {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "down";
}

export interface OutreachStats {
  householdsReached: number;
  householdsTarget: number;
  villagesCovered: number;
  villagesMapped: number;
  sessionsConducted: number;
  sessionsToday: number;
  enrolmentConversionPct: number;
  enrolmentConversionPrevPct: number;
  beneficiariesEnrolled: number;
  beneficiariesPendingVerification: number;
  avgPerExecutive: number;
}

export const outreachStatsBaseline: OutreachStats = {
  householdsReached: 3412,
  householdsTarget: 4000,
  villagesCovered: 128,
  villagesMapped: 140,
  sessionsConducted: 246,
  sessionsToday: 18,
  enrolmentConversionPct: 38,
  enrolmentConversionPrevPct: 31,
  beneficiariesEnrolled: 1297,
  beneficiariesPendingVerification: 84,
  avgPerExecutive: 62,
};

// Pure formatter: turns raw stats (static or live) into the six display cards.
export function buildOutreachKpis(stats: OutreachStats): OutreachKpi[] {
  const fmt = (n: number) => n.toLocaleString("en-IN");
  return [
    {
      label: "Households reached",
      value: fmt(stats.householdsReached),
      sub: `this month, against a target of ${fmt(stats.householdsTarget)}`,
    },
    {
      label: "Villages covered",
      value: fmt(stats.villagesCovered),
      sub: `of ${stats.villagesMapped} mapped`,
    },
    {
      label: "Sessions conducted",
      value: fmt(stats.sessionsConducted),
      sub: `${stats.sessionsToday} today`,
    },
    {
      label: "Enrolment conversion",
      value: `${stats.enrolmentConversionPct}%`,
      sub: `up from ${stats.enrolmentConversionPrevPct}% last month`,
      trend: "up",
    },
    {
      label: "Beneficiaries enrolled",
      value: fmt(stats.beneficiariesEnrolled),
      sub: `${stats.beneficiariesPendingVerification} pending verification`,
    },
    {
      label: "Avg per executive",
      value: String(stats.avgPerExecutive),
      sub: "households per executive per month",
    },
  ];
}

export interface DistrictOutreach {
  district: string;
  households: number;
}

export const districtOutreachBaseline: DistrictOutreach[] = [
  { district: "Bhopal", households: 640 },
  { district: "Sagar", households: 610 },
  { district: "Vidisha", households: 590 },
  { district: "Damoh", households: 520 },
  { district: "Betul", households: 480 },
  { district: "Chhatarpur", households: 572 },
];

// Per-district reference target line (monthly programme target of 4,000 split evenly).
export const districtOutreachTarget = 667;

// ---------------------------------------------------------------------------
// A4. Payroll and finance (static)
// ---------------------------------------------------------------------------

export const payroll = {
  executiveCount: 55,
  grossWageLabel: "₹9.84L",
  wageRunStatus: "Locked 10 March",
  overtimeHoursTotal: 412,
  overtimeHoursUnapproved: 38,
  advancesOutstandingLabel: "₹1.42L",
  advancesExecutiveCount: 19,
  reimbursementsPendingCount: 23,
  reimbursementsPendingLabel: "₹68,400",
  reimbursementsOldestDays: 6,
  nextDisbursementDate: "15 March",
};

// ---------------------------------------------------------------------------
// A5. Compliance and IR desk (static)
// ---------------------------------------------------------------------------

export type ComplianceStatus = "filed" | "due" | "escalated" | "expired";

export const compliance = {
  pfEcr: { period: "February", status: "filed" as ComplianceStatus, note: "Challan stored" },
  esic: { period: "February", status: "filed" as ComplianceStatus, note: "Challan stored" },
  professionalTax: { statesFiled: 2, statesTotal: 3, dueInDays: 4 },
  minimumWage: { state: "MP", effectiveDate: "01 Jan", appliedToCount: 22 },
  registers: ["Form A", "Form B", "Overtime register"],
  clra: { location: "Bhopal", renewalInDays: 41 },
};

export const irDesk = {
  openGrievances: 4,
  items: [
    { type: "Wage dispute", district: "Sagar", raisedDaysAgo: 9, status: "escalated" as ComplianceStatus },
  ],
};

// ---------------------------------------------------------------------------
// A6. Issues and escalations (static)
// ---------------------------------------------------------------------------

export interface IssueRow {
  label: string;
  detail: string;
}

export const issues: IssueRow[] = [
  { label: "Location mismatch", detail: "4 executives · today" },
  { label: "No check-in for 2 days", detail: "1 executive · Vidisha" },
  { label: "Reimbursement claim over 5 days old", detail: "6 claims" },
  { label: "Grievance escalated to IR", detail: "1 case" },
];

// ---------------------------------------------------------------------------
// Screen B: Field executive view (Sunita Devi)
// ---------------------------------------------------------------------------

export interface PhoneTab {
  key: "today" | "activity" | "attendance" | "money";
  labelEn: string;
  labelHi: string;
}

export const phoneTabs: PhoneTab[] = [
  { key: "today", labelEn: "Today", labelHi: "आज" },
  { key: "activity", labelEn: "Activity", labelHi: "गतिविधि" },
  { key: "attendance", labelEn: "Attendance", labelHi: "हाज़िरी" },
  { key: "money", labelEn: "Money", labelHi: "पैसा" },
];

export type ActivityType =
  | "Household visit"
  | "Group session"
  | "Follow-up"
  | "Enrolment";

export const activityTypes: ActivityType[] = [
  "Household visit",
  "Group session",
  "Follow-up",
  "Enrolment",
];

// Sagar-district villages Sunita Devi actually covers, used for the log-activity form.
export const sunitaVillages = ["Rehli", "Banda", "Khurai", "Kesli", "Malthone"];

export interface LoggedEntry {
  time?: string;
  date?: string;
  village: string;
  type: ActivityType;
  photoAttached: boolean;
  gpsVerified: boolean;
  photoPending?: boolean;
}

export const fieldExecutive = {
  name: "Sunita Devi",
  id: "FE-MP-0284",
  district: "Sagar district",
  dateLabel: "12 March 2026",

  labels: {
    downloadPayslip: "वेतन पर्ची डाउनलोड करें · Download payslip",
    raiseQuery: "क्वेरी दर्ज करें · Raise a query",
    logActivity: "नई गतिविधि दर्ज करें · Log new activity",
  },

  // Live baseline: seeds lib/liveStore.tsx. The store, not this object, is
  // read by TodayTab and ActivityTab from here on.
  today: {
    checkIn: {
      time: "09:12",
      village: "Rehli",
      verified: true,
    },
    target: { total: 4, done: 2 },
    entries: [
      { time: "10:22", village: "Rehli", type: "Household visit" as ActivityType, photoAttached: true, gpsVerified: true },
      { time: "11:40", village: "Rehli", type: "Group session" as ActivityType, photoAttached: true, gpsVerified: true },
    ] as LoggedEntry[],
  },

  activity: {
    month: { householdsReached: 62, conversionPct: 38 },
    target: 70,
    entries: [
      { date: "12 Mar", village: "Rehli", type: "Household visit" as ActivityType, photoAttached: true, gpsVerified: true },
      { date: "12 Mar", village: "Rehli", type: "Group session" as ActivityType, photoAttached: true, gpsVerified: true },
      { date: "11 Mar", village: "Rehli", type: "Follow-up" as ActivityType, photoAttached: false, gpsVerified: true, photoPending: true },
      { date: "11 Mar", village: "Rehli", type: "Enrolment" as ActivityType, photoAttached: true, gpsVerified: true },
      { date: "10 Mar", village: "Banda", type: "Household visit" as ActivityType, photoAttached: true, gpsVerified: true },
    ] as LoggedEntry[],
  },

  // Static (attendance tab and money tab do not change live in this build).
  attendance: {
    march: { present: 21, leave: 2, absent: 1 },
    overtimeHours: 9,
    holidaysRemaining: { casual: 4, earned: 6 },
    // 31-day grid: P present, A absent, L leave, "-" not yet reached / no data.
    monthGrid: [
      "P", "P", "P", "P", "P", "L", "P",
      "P", "P", "A", "P", "P", "P", "L",
      "P", "P", "P", "P", "P", "P", "P",
      "P", "P", "P", "P", "P", "P", "P",
      "-", "-", "-",
    ],
    todayIndex: 11, // 12 March, zero-indexed
    unverifiedCellIndex: 11,
    unverifiedNote: "Location not verified, marked by supervisor",
  },

  money: {
    lastSalary: { month: "February", amount: "₹18,240", creditedDate: "08 March", utr: "N0873…441" },
    lastReimbursement: { type: "Travel claim", amount: "₹1,180", status: "approved", date: "06 March" },
    pendingClaim: { type: "Travel", amount: "₹640", submittedDate: "09 March", status: "awaiting approval" },
    advance: { outstanding: "₹4,000", monthlyDeduction: "₹1,000", instalmentsLeft: 4 },
  },
};

// ---------------------------------------------------------------------------
// Login (demo only)
// ---------------------------------------------------------------------------

export interface DemoAccount {
  loginId: string;
  password: string;
  role: "programme" | "field";
  displayName: string;
}

// Demo-only credentials, used purely to route the login screen to the right
// view. Not real authentication: visible in the client bundle, no backend,
// no password hashing, no session security. That is intentional for a
// demonstration build with no auth system behind it.
export const demoAccounts: DemoAccount[] = [
  { loginId: "admin", password: "admin123", role: "programme", displayName: "Programme Admin" },
  { loginId: fieldExecutive.id, password: "field123", role: "field", displayName: fieldExecutive.name },
];
