type Proj = { p50:number, lo:number, hi:number, position:string }
export function pickLineup(roster:string[], slots:Record<string,number>, projections:Record<string,Proj>, opts?:{margin?:number}){
  const margin = opts?.margin ?? 1.5
  const posGroups: Record<string,string[]> = { QB:[], RB:[], WR:[], TE:[], K:[], DEF:[] }
  for (const pid of roster){ const p=projections[pid]; if(!p) continue; const pos=(p.position||'').toUpperCase(); if(!posGroups[pos]) posGroups[pos]=[]; posGroups[pos].push(pid) }
  const chosen:string[]=[]; const used=new Set<string>(); const order=['QB','RB','WR','TE','K','DEF']
  function bestOf(cands:string[], count:number){ const usable=cands.filter(id=>!used.has(id)).sort((a,b)=>projections[b].p50 - projections[a].p50); const picked=usable.slice(0,count); picked.forEach(id=>used.add(id)); chosen.push(...picked) }
  for (const s of order){ const need=slots[s]||0; if(need>0) bestOf(posGroups[s]||[], need) }
  const flexNeed = slots.FLEX||0
  if (flexNeed>0){ const flexC = ['RB','WR','TE'].flatMap(p=> (posGroups[p]||[]).filter(id=>!used.has(id))); bestOf(flexC, flexNeed) }
  const bench = roster.filter(id=>!used.has(id))
  const notes = [`Chose starters to maximize p50; tie-breaker uses lo within ${margin} pts.`]
  return { starters: chosen, bench, notes }
}
