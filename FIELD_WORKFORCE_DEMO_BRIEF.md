# Claude Code Brief — Field Workforce Demo (Tata Steel demo build)

Paste this whole file into Claude Code as the opening message of a fresh session,
in a fresh repo. It is self-contained: no other file from any other project is needed.

---

## 0. What this is

A two-screen web demo of a field workforce management product, built to show a
prospective enterprise client what the system does.

**Context for the build, not for the screen.** AamDhanE is an Indian blue-collar
workforce company. It sources contract workers for enterprise clients, runs their
payroll and carries their labour compliance. It is now building software for the same
clients. This demo shows the field-workforce version of that product: staff deployed
across scattered rural locations rather than at a single factory gate.

The workforce being modelled is a CSR field programme. Roughly fifty-five field
executives working across villages in several districts, doing community outreach.
They do not report to a fixed site. They move between villages, log activity through
the day, and are paid on attendance plus overtime with reimbursements on top.

**Demo only.** No backend, no auth, no database. All data is hardcoded and realistic.
It must survive being clicked around live in front of a client without anything
breaking or looking empty.

---

## 1. Stack

- **Next.js 14+, App Router, TypeScript**
- **Tailwind CSS**, tokens named in `tailwind.config.ts`
- **lucide-react** for icons
- **recharts** for the two charts
- No database, no API routes, no auth, no environment variables
- Deploy target: Vercel. Must build clean with `next build` and zero configuration

All mock data lives in `content/data.ts`, typed, so numbers can be edited in one place
before a demo.

---

## 2. The two screens

A single page at `/` with a view switcher pinned to the top right: **Programme view**
and **Field executive view**. Switching is instant, no route change, no reload. During
a live demo the presenter will toggle between them repeatedly, so the switch must be
obvious and fast.

Default to Programme view.

---

## 3. Screen A: Programme view (the employer)

What a programme manager or HR lead sees. Desktop-first, but must not break on a
tablet, since it may be shown on one.

Header strip: programme name, `55 field executives · 6 districts · March 2026`, and
a date selector showing `Today, 12 March 2026` (non-functional, decorative).

### A1. Live deployment map

The largest element on the screen, top left, roughly two thirds width.

A stylised district map drawn in **SVG**, not a real map library. Scattered pins across
an abstract shape with district labels. Do not use Google Maps, Mapbox or Leaflet:
they need keys, they load slowly, and they fail on bad conference wifi.

- 55 pins total, positioned across 6 labelled district clusters
- Pin states: green for checked in and inside the assigned village boundary, amber for
  checked in but outside the boundary, grey for not checked in, red for no location
  received in over 4 hours
- Counts: 47 in boundary, 4 outside boundary, 3 not checked in, 1 no signal
- Hovering a pin shows a small card: name, village, check-in time, last activity
- A legend below the map

The four states are the point of this panel. A map where everything is green looks
like a mock-up. A map with four amber and one red looks like a system.

### A2. Attendance today

Top right, beside the map.

- Big number: `51 of 55 present`
- Below it, four rows: On time 44, Late 7, Absent 3, On leave 1
- A note line: `4 check-ins pending location verification`

### A3. Outreach KPIs

Full width band below the map. This is the client's own success measure and it should
sit visually above the payroll and compliance panels, because it is what a programme
lead actually cares about.

Six stat cards in a row:

| Metric | Value | Sub |
|---|---|---|
| Households reached | 3,412 | this month, against a target of 4,000 |
| Villages covered | 128 | of 140 mapped |
| Sessions conducted | 246 | 18 today |
| Enrolment conversion | 38% | up from 31% last month |
| Beneficiaries enrolled | 1,297 | 84 pending verification |
| Avg per executive | 62 | households per executive per month |

Each card: label small and grey, value large, sub-line small. The conversion card
carries a small upward indicator in green.

Below the cards, a **recharts bar chart**: households reached per district across the
six districts, with the target as a reference line. Keep it quiet: one colour, no
legend, no gridlines except a faint horizontal set.

### A4. Payroll and finance

Left panel of a two-panel row.

- Wage run for March: 55 executives, gross ₹9.84L, status `Locked 10 March`
- Overtime this month: 412 hours, of which 38 hours unapproved and held back
- Advances outstanding: ₹1.42L across 19 executives
- Reimbursements pending approval: 23 claims, ₹68,400, oldest 6 days
- Next disbursement: 15 March

Present as labelled rows with the values right-aligned in mono. The unapproved
overtime and the oldest pending claim should carry an attention colour.

### A5. Compliance and IR desk

Right panel of the same row.

- PF ECR, February: filed, challan stored
- ESIC return, February: filed, challan stored
- Professional tax, 3 states: 2 filed, 1 due in 4 days
- Minimum wage: MP revision effective 01 Jan applied to 22 executives
- Registers: Form A, Form B, overtime register, all generated
- CLRA licence, Bhopal: renewal in 41 days
- A `Download inspection pack` button

Then an IR sub-block:

- Open grievances: 4
- One row showing `Wage dispute · Sagar district · raised 9 days ago · escalated`

Status colours: green for filed and complete, amber for due or pending, red for
escalated or expired.

### A6. Issues and escalations

Narrow strip at the bottom, four rows:

- `Location mismatch · 4 executives · today`
- `No check-in for 2 days · 1 executive · Vidisha`
- `Reimbursement claim over 5 days old · 6 claims`
- `Grievance escalated to IR · 1 case`

---

## 4. Screen B: Field executive view (the worker)

This is a phone screen, so render it inside a phone frame centred on the page, with a
brief explanatory column beside it saying what the executive can do. Do not stretch a
phone UI across a desktop width.

The phone frame is real DOM. Simple bezel, status bar, no notch drawing.

Executive shown: **Sunita Devi · FE-MP-0284 · Sagar district**

Screens inside the phone, reachable by a small tab bar at the bottom with four tabs:
Today, Activity, Attendance, Money.

### B1. Today (default tab)

- Greeting with the executive's name and the date
- Check-in card: `Checked in 09:12 · Village Bamhori · location verified` with a green
  tick and a small thumbnail placeholder for the selfie taken at check-in
- Today's target: `4 household visits · 2 done`
- A prominent action button: `नई गतिविधि दर्ज करें · Log new activity`
- Below: two activity entries already logged today, each with time, village, type,
  and a small photo thumbnail

### B2. Activity (the outreach log)

- This month: `62 households reached · 38% enrolment conversion`
- A small progress ring or bar against a target of 70
- List of recent entries, five rows: date, village, activity type (Household visit,
  Group session, Follow-up, Enrolment), photo attached, GPS verified badge
- One entry deliberately shows `Photo pending` in amber

The photo and GPS badges are the point of this tab. Verification of field activity is
what a programme lead is buying.

### B3. Attendance

- March summary: `21 present · 2 leave · 1 absent`
- Overtime this month: 9 hours
- Holidays remaining: `Casual 4 · Earned 6`
- A compact month grid of P, A, L cells with today highlighted
- One cell in amber with a note: `Location not verified, marked by supervisor`

### B4. Money

- Last salary: `February · ₹18,240 credited 08 March · UTR N0873…441`
- Last reimbursement: `Travel claim ₹1,180 · approved 06 March`
- Pending claim: `Travel ₹640 · submitted 09 March · awaiting approval` in amber
- Advance outstanding: `₹4,000 · ₹1,000 deducted monthly · 4 instalments left`
- A `Download payslip` button and a `Raise a query` link

Hindi labels appear on worker-facing actions, alongside English. For example
`नई गतिविधि दर्ज करें`, `हाज़िरी`, `वेतन पर्ची`. Programme view stays English only.

---

## 5. Design

The audience is enterprise. It must look like an operating system for a programme, not
like a consumer app.

### Palette

| Token | Hex | Use |
|---|---|---|
| `brand` | `#2AA8E0` | Primary accent, active states, links |
| `brand-dk` | `#1B7FAD` | Hover and pressed |
| `verified` | `#5AB552` | Verified, filed, present, paid |
| `action` | `#F5822B` | Primary buttons, attention |
| `hold` | `#F6C445` | Pending, awaiting, unverified |
| `alert` | `#D14343` | Escalated, expired, failed |
| `deep` | `#07202E` | Headers, dark chrome, phone bezel |
| `deep2` | `#0E2E40` | Secondary dark |
| `deep3` | `#5B7383` | Muted text |
| `paper` | `#F2F4F5` | Page background |
| `card` | `#FFFFFF` | Panels |
| `rule` | `#D8DDE0` | Borders |

Green means confirmed, amber means waiting, red means broken, orange means act. Use
colour only to carry those meanings. Every large surface stays white, paper or deep.

No gradients. No glassmorphism. No coloured header bars or accent stripes down the
edge of a card. Panels are white with a 1px `rule` border and a 6px radius.

### Type

- **Inter** for everything, loaded via `next/font/google`
- **IBM Plex Mono** for all data: IDs, UTRs, times, counts, currency, status labels
- Panel titles 11px uppercase with letter-spacing, in `deep3`
- Stat values 28 to 34px, semibold, in `deep`

### Density

This should feel information-dense, the way an operations console does. Tight rows,
hairline dividers, small labels. Resist whitespace-heavy marketing layout. A programme
manager wants to see everything at once.

---

## 6. Mock data rules

- Put every number in `content/data.ts`. Nothing hardcoded inside components.
- **Every panel must contain at least one problem state.** Four executives outside
  their boundary, one with no signal, 38 hours of unapproved overtime, one PT filing
  due in 4 days, one escalated grievance, one photo pending, one unverified check-in.
  Clean data reads as a mock-up. Data with problems in it reads as a live system, and
  it is the difference between a client watching politely and a client leaning in.
- Names should be plausible Indian field-staff names across MP, UP and Bihar. Villages
  and districts likewise. Keep them generic and invented.
- Do not put any real client's name, logo or data anywhere in the app. The demo is
  narrated, not labelled.

---

## 7. Quality floor

- Builds clean with `next build`, zero environment variables
- Works fully offline once loaded. No external API calls, no map tiles, no fonts
  fetched at runtime that would break on bad wifi. Self-host or preload everything.
- Renders correctly at 1440 and 1280 desktop widths, and does not break on a tablet
- The view switcher is a real `<button>` pair with `aria-pressed`
- No `localStorage` or `sessionStorage`
- No loading spinners or skeleton states. This is static data. It should appear instantly.
- Page title: `Field Workforce Console` with no client name in it

---

## 8. Build order

1. Tailwind tokens, fonts, page shell, view switcher
2. `content/data.ts` with every number from this brief
3. Screen A panels in order: map, attendance, KPIs, payroll, compliance, issues
4. Screen B phone frame and the four tabs
5. Responsive pass and final polish

**Stop and show me after step 3.** The SVG map and the KPI band carry the demo. If
those two do not look convincing, nothing built after them will.

---

## 9. Deploy

```bash
git init
git add -A
git commit -m "initial"
git branch -M main
git remote add origin <the empty private repo you created on GitHub>
git push -u origin main
```

Then on vercel.com: Add New, Project, import the repo, change nothing, Deploy.
Roughly ninety seconds to a live URL. Use a subdomain rather than the generated
`.vercel.app` address if this link will be sent rather than screen-shared.

---

## 10. Non-negotiables

- No em-dashes in any copy. Use colons, full stops, or restructure
- No real client names, logos or data anywhere in the application
- No invented performance claims, testimonials or "trusted by" content
- Nothing described as live or in production. This is a demonstration build
- No stock photography and no illustrations of people. Photo slots are grey
  placeholder frames
