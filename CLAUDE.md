# Field workforce demo. Project rules.

Field workforce demo for a prospective enterprise client. Next.js 14 App
Router, TypeScript, Tailwind. Deployed on Vercel. The full original spec is
in `FIELD_WORKFORCE_DEMO_BRIEF.md`. Read it before changing anything.

**This file amends that brief.** The brief originally called for a single
static page with a manual view switcher, no auth, no client-side storage, and
no interactivity. That changed: the product now needs to feel real, not like
a slide with a toggle. Read the amendments below before assuming the brief's
"no backend / no auth / no storage" section still applies as written.

## What changed from the original brief, and why

- **Login replaces the manual view switcher.** `/login` routes to `/programme`
  or `/field` based on which demo account signs in. There is still no real
  backend and no real identity system: `content/data.ts` holds two hardcoded
  demo accounts (`demoAccounts`), checked entirely client-side. Anyone reading
  the JS bundle or network tab can see them. That's fine and expected for a
  demo; never treat this as real auth or extend it toward one.
- **Session persists across a refresh**, via `sessionStorage` (`lib/session.tsx`).
  This is a deliberate, narrow exception to the brief's original "no
  localStorage or sessionStorage" rule: it stores only `{role, loginId,
  displayName}`, nothing else. Don't use storage for anything beyond session
  identity without raising it explicitly, the same way this exception was.
- **Field-executive actions are live and sync across browser tabs.**
  `lib/liveStore.tsx` holds the mutable slices of the demo (map pins, outreach
  counters, the field executive's own today/activity log) and syncs them
  across tabs on the same browser via `BroadcastChannel`. There is still no
  server and no persistence beyond open tabs: closing every tab resets state
  back to the baseline in `content/data.ts`. This only syncs tabs on the same
  machine, not two independent devices over the internet, on purpose, see
  below.

## Why not a real backend

A real shared backend (database + API routes) would give true sync across
independent devices, but it breaks two things the original brief was
explicit about and that still matter for a live client demo:

- **"Works fully offline once loaded, no external API calls."** A backend
  dependency means the demo can fail on bad conference wifi, exactly the
  failure mode the brief called out by name.
- **Zero-config Vercel deploy, no environment variables.** A database needs
  connection secrets and infrastructure to provision and maintain.

`BroadcastChannel` gets most of the "this is a real interconnected product"
effect for a live demo (presenter drives both views from two tabs on their
own laptop) with none of that risk. If a future need genuinely requires
cross-device sync, that's a real architecture conversation to have with
whoever's running the demo, not a default to reach for.

## What's live vs. static

Live (in `lib/liveStore.tsx`, seeded from `content/data.ts` baselines, synced
across tabs):
- `fieldPins` (the map), specifically the pin for `FE-MP-0284` (Sunita Devi,
  the field-exec demo login: same record as her phone view, not a separate
  character)
- `outreachStats` (households reached, sessions conducted/today)
- `districtOutreach` (the Sagar bar, when she logs a household visit)
- Sunita's own `today` and `activity` tabs

Static (still read straight from `content/data.ts`, unaffected by any action):
attendance today, payroll, compliance/IR desk, issues, Sunita's attendance
and money tabs. A field exec's phone action wouldn't plausibly move payroll
or compliance numbers in real time, so don't wire those up without deciding
that's actually wanted first.

The only field-exec action currently wired up is **log new activity**
(`components/field/LogActivityForm.tsx` → `useLiveStore().logActivity`).
Check-in is not interactive: Sunita's baseline data already shows her
checked in, to keep the brief's stated numbers (51 of 55 present, 47 in
boundary, etc.) accurate on first load.

## Everything else from the original brief still applies

- All mock data lives in `content/data.ts`. Never hardcode a number, name or
  status inside a component.
- Shared UI primitives live in `components/ui/`. Reuse them.
- Design tokens live in `tailwind.config.ts`. Never write a raw hex value in
  a component.
- No em-dashes anywhere. No real client names, logos or data. No invented
  metrics or testimonials. Nothing described as live/in production outside
  of the demo's own narrative ("LIVE" on the map panel refers to the demo's
  cross-tab sync, not a real production system).
- Every panel keeps at least one problem state in its data.
- If a change requires editing a file outside what you were asked to do, say
  so and stop.

## Git

- Never commit directly to `main`. Always branch: `<initials>/<short-description>`.
- Never `git push --force`, never rewrite published history.
- Run `npm run build` before every push. Do not push a failing build.
- Open a pull request and let the Vercel preview build before merging.
- Keep branches small. Merge the same day where possible.

## Before saying a task is done

- `npm run build` passes
- The change renders correctly at 1440 and 1280 widths
- If it touches `/field`, check it at a real mobile width (375) too, the
  phone bezel is presentation chrome and should disappear there
- No new dependency was added without being asked
