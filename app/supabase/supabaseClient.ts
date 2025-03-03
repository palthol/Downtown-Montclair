import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string // your Supabase URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string // your anon public key

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is not defined!")
  }

export const supabase = createClient(supabaseUrl, supabaseAnonKey)