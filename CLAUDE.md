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
- **Field-executive actions are live and sync across devices.**
  `lib/liveStore.tsx` holds the mutable slices of the demo (map pins, outreach
  counters, the field executive's own today/activity log) and syncs them via
  a pub/sub layer with two transports, chosen automatically by
  `lib/supabaseClient.ts`:
  - **Supabase Realtime Broadcast**, when `NEXT_PUBLIC_SUPABASE_URL` and
    `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set (they are, in all three Vercel
    environments as of this writing): syncs across *independent devices* over
    the internet, e.g. a real phone and a real PC in different browsers. This
    is what lets `/field` on a phone update `/programme` on a laptop live.
  - **`BroadcastChannel`**, when those env vars are absent (e.g. local dev
    with no `.env.local`): same-device-only fallback, zero network
    dependency.
  Either way there is still no database write and no API route: it's a pure
  message relay, not application state storage. Closing every
  tab/device/browser resets state back to the baseline in `content/data.ts`.

## Why Supabase Realtime, not a full backend, and what changed

The original stance here was "no backend, same-device sync only," to protect
two things the brief was explicit about. That stance changed, deliberately,
when the user asked for a demo where a real phone updates a real PC live —
same-device sync structurally cannot do that, no matter how it's built. Here
is what actually changed and what didn't:

- **"Works fully offline once loaded, no external API calls."** This is now
  genuinely relaxed when Supabase env vars are present: the live-sync feature
  needs internet at the demo venue. Nothing else does — the rest of the app
  (all the static panels, the map's own rendering, login) has no other
  network dependency. If Supabase is unreachable, the transport falls back to
  same-device-only sync per browser, not a crash; the demo degrades rather
  than breaks, but cross-device sync specifically won't work without a
  connection. Check the venue has working wifi before relying on this.
- **"Zero-config Vercel deploy, no environment variables."** Also relaxed:
  `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set on
  the Vercel project (all three environments) and in `.env.local` locally
  (gitignored, never commit it). Both are safe to expose client-side by
  design — the anon/publishable key carries no access to anything, since no
  database table or storage bucket is used, only ephemeral Broadcast
  messaging. Losing or rotating them means redoing
  `vercel env add NEXT_PUBLIC_SUPABASE_URL <env>` etc. for all three
  environments (production, preview, development).
- **What's still true:** no database, no server-side application code, no API
  routes, no persistence beyond what's live in open browsers right now. This
  is a message relay, not a backend for the app's data model. Don't let this
  precedent justify adding a real database or API routes without a similarly
  explicit ask.
- `@supabase/supabase-js` is now a real dependency (`package.json`), added
  for this specific reason. Don't add further dependencies on that
  precedent without being asked, same as always.

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

Two field-exec actions are wired up: **check in**
(`components/field/TodayTab.tsx` → `useLiveStore().checkIn`) and **log new
activity** (`components/field/LogActivityForm.tsx` →
`useLiveStore().logActivity`). Logging an activity is blocked, in both the UI
and the reducer, until check-in has happened, same as it would be in a real
field app.

**This means Sunita's baseline is deliberately "before her day has started":**
not checked in, her `today` tab empty, `target.done: 0`. Her map pin starts
`not_checked_in` rather than `in_boundary`. That's a conscious trade-off: the
brief's exact stated map counts (47 in boundary, 51 of 55 present, etc.) only
hold once she's checked in, not on a literal first paint. A presenter should
check her in as the first beat of the /field half of the demo, at which point
the map's live-computed legend (already dynamic, see `countPinsByStatus`)
lands back on the brief's numbers. If a demo needs those exact numbers to be
true before any interaction at all (e.g. a screenshot for a deck), that's a
different, static-only need, don't reach for this store to solve it, just
hardcode a screenshot-only variant or ask for guidance.

The static "Attendance Today" panel on `/programme` is intentionally **not**
recomputed from her check-in: it would need a placeholder bucket for "not yet
accounted for" to keep its rows summing to 55, which isn't built. Its numbers
match the brief exactly and don't move during a demo, only the map's own
legend and Sunita's phone view do. Real attendance rollups often lag anyway,
so this is a defensible product simplification, not just a shortcut, but if a
future change wants that panel live too, this note is why it currently isn't.

## Branding

The brief's non-negotiable #2 was "No real client names, logos or data
anywhere in the application." **That rule is now overridden, on purpose, at
the user's explicit request**, made twice: once when naming the GitHub repo
(`ade-itc-field-workforce-console`), and again when asked directly to rename
the in-app programme from "Disha Field Programme" to **"ITC FieldView"**
(`content/data.ts` → `programme.name`). This is a real prospective client
name (ITC), now inside the rendered application itself, not just repo/URL
infrastructure. That's a materially bigger exposure than the repo name was,
flagged as such when it happened, and the user chose to proceed anyway,
saying branding would be refined later.

Practical effect: don't revert `programme.name` back to something generic
thinking it's restoring brief compliance, it isn't a bug. Do keep everything
else the brief protects against real client exposure intact unless similarly
instructed: no ITC logo, no invented ITC-specific metrics, and the page
`<title>` stays "Field Workforce Console" (a separate, more explicit rule
that hasn't been touched). If more ITC-specific branding lands later, log it
here the same way, and remember the production Vercel URL becomes the
exposure surface, not just the source: mind who that link goes to.

## Everything else from the original brief still applies

- All mock data lives in `content/data.ts`. Never hardcode a number, name or
  status inside a component.
- Shared UI primitives live in `components/ui/`. Reuse them.
- Design tokens live in `tailwind.config.ts`. Never write a raw hex value in
  a component.
- No em-dashes anywhere. No invented metrics or testimonials. Nothing
  described as live/in production outside of the demo's own narrative ("LIVE"
  on the map panel refers to the demo's cross-tab sync, not a real production
  system). See "Branding" above for the one deliberate exception to "no real
  client names."
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
- If it touches `lib/liveStore.tsx`, verify sync still works: two tabs is
  enough to prove the mechanism (Supabase relays over the real internet
  regardless of whether both tabs happen to share a machine), no need for
  an actual second device to confirm a code change didn't break it
- No new dependency was added without being asked

## Reference

- Supabase project: "FieldView" under the "AamDhanE" org, project ref
  `qmdnqhsxtjiekzhicyuf`. Realtime Broadcast only, no tables/schema in use.
  Dashboard: https://supabase.com/dashboard/project/qmdnqhsxtjiekzhicyuf
