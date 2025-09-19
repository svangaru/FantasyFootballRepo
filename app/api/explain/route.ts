import { NextResponse } from 'next/server'
export async function POST(req: Request){
  const body = await req.json().catch(()=>({}))
  const reasons = body?.reasons || []
  const parts: string[] = []
  for (const r of reasons){
    if (r.type === 'waiver') parts.push(`Waiver: ${r.player} adds ~${(r.evor||0).toFixed(1)} pts. ${r.note||''}`)
    if (r.type === 'start_sit') parts.push(`Start/Sit: ${r.decision} over ${r.over} by ${(r.margin||0).toFixed(1)} pts.`)
  }
  return NextResponse.json({ text: parts.join(' ') })
}
