'use client'
import { useState } from 'react'
export default function Home(){
  const [status, setStatus] = useState(''); const [projections, setProjections] = useState<any[]>([]); const [explain, setExplain] = useState('')
  const trigger = async ()=>{ const r=await fetch('/api/trigger-weekly',{method:'POST'}); setStatus(JSON.stringify(await r.json())) }
  const loadProjections = async ()=>{ const r=await fetch('/api/projections'); setProjections(await r.json()) }
  const explainIt = async ()=>{ const r=await fetch('/api/explain',{method:'POST', body: JSON.stringify({ reasons:[{type:'waiver',player:'RB A',evor:6.2,note:'soft run defenses'},{type:'start_sit',decision:'start',over:'WR B',margin:1.8}] })}); const j=await r.json(); setExplain(j.text||'') }
  return (<div className="app"><header className="topbar">ffmlops</header>
    <div className="card"><button onClick={trigger}>Trigger Weekly</button> <button onClick={loadProjections}>Load Projections</button> <button onClick={explainIt}>Explain</button></div>
    <div className="grid"><div className="card"><h3>Status</h3><pre>{status}</pre></div><div className="card"><h3>Explain</h3><pre>{explain}</pre></div></div>
    <div className="card"><h3>Projections (sample)</h3><pre>{JSON.stringify(projections.slice(0,10), null, 2)}</pre></div>
  </div>)
}
