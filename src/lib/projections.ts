import { supabaseAdmin } from './db'
import type { ProjectionRow } from './types'
export async function getProjectionsSample(): Promise<ProjectionRow[]>{
  const { data, error } = await supabaseAdmin.from('pred_cache').select('*').limit(25)
  if (error || !data?.length){
    return [
      { player_id: 'player#1', season: 2025, week: 1, p50: 10.2, lo: 7.0, hi: 14.1 },
      { player_id: 'player#2', season: 2025, week: 1, p50: 8.6, lo: 5.5, hi: 12.3 }
    ]
  }
  return data.map((r:any)=>({ player_id: r.sk, season: parseInt((r.pk||'').split('#')[1]||'2025',10), week: parseInt((r.pk||'').split('#')[3]||'1',10), p50:r.p50, lo:r.lo, hi:r.hi }))
}
