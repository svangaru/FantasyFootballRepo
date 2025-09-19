import { createClient } from '@supabase/supabase-js'
import { CONFIG } from './config'
export const supabaseAdmin = createClient(CONFIG.supabaseUrl, CONFIG.supabaseServiceKey, { auth: { persistSession: false } })
