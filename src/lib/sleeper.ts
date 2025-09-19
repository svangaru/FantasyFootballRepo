import { CONFIG } from './config'
async function j<T>(r:Response): Promise<T>{ if(!r.ok) throw new Error(`Sleeper ${r.status}`); return r.json() as Promise<T> }
export async function getUserByUsername(username:string){ const r=await fetch(`${CONFIG.sleeperBase}/user/${encodeURIComponent(username)}`,{cache:'no-store'}); return j<any>(r) }
export async function getUserLeagues(user_id:string, sport='nfl', season:number){ const r=await fetch(`${CONFIG.sleeperBase}/user/${user_id}/leagues/${sport}/${season}`,{cache:'no-store'}); return j<any>(r) }
export async function getLeagueRosters(league_id:string){ const r=await fetch(`${CONFIG.sleeperBase}/league/${league_id}/rosters`,{cache:'no-store'}); return j<any>(r) }
export async function getLeagueMatchups(league_id:string, week:number){ const r=await fetch(`${CONFIG.sleeperBase}/league/${league_id}/matchups/${week}`,{cache:'no-store'}); return j<any>(r) }
export async function getPlayers(){ const r=await fetch(`${CONFIG.sleeperBase}/players/nfl`,{cache:'force-cache'}); return j<Record<string,any>>(r) }
export async function getLeagueFreeAgents(league_id:string){ return [] as any[] }
