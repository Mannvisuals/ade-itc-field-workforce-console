// Supabase client for the live-sync feature only. Nothing is written to or
// read from the database: this project's Realtime "Broadcast" channels are
// used purely as a message relay between browsers, the same role
// BroadcastChannel plays for same-device sync (see lib/liveStore.tsx).
//
// The key here is the "publishable" key, meant to be public: it's exposed in
// every browser bundle, the same way a Stripe publishable key or a Firebase
// client config is. It is not a secret and carries no access to anything,
// since no database table or storage bucket is used.
//
// If NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY aren't set
// (e.g. local dev without a .env.local), `supabase` is null and
// lib/liveStore.tsx falls back to same-device BroadcastChannel sync only.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;
