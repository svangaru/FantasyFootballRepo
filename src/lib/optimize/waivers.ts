type WeekProj = { p50:number }
export function rankWaivers(
  candidates:string[],
  positionOf:(id:string)=>string,
  horizonProj:(id:string,week:number)=>WeekProj|undefined,
  weeks:number[],
  baseline:(pos:string,week:number)=>number,
  teamNeedWeight?:(pos:string)=>number
){
  const out:{player_id:string, evor:number, reasons:string[]}[]=[]
  for (const id of candidates){
    const pos = positionOf(id); let sum = 0
    for (const w of weeks){ const pr=horizonProj(id,w); const bl=baseline(pos,w); if(pr){ sum += Math.max(0, pr.p50 - bl) } }
    const mult = teamNeedWeight ? teamNeedWeight(pos) : 1
    out.push({ player_id:id, evor: sum*mult, reasons:[`pos=${pos}`, `mult=${mult.toFixed(2)}`, `weeks=${weeks.join(',')}`] })
  }
  out.sort((a,b)=> b.evor - a.evor)
  return out
}
