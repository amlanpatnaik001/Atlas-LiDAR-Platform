"use client";
import { useRef, useState } from "react";
import { FileUp, FileCheck2, AlertTriangle } from "lucide-react";
import { Panel } from "../../components/ui/Panel";
import { Badge } from "../../components/ui/Badge";

export default function Upload(){
 const ref=useRef<HTMLInputElement>(null); const [file,setFile]=useState<File|null>(null); const [drag,setDrag]=useState(false);
 const choose=(f?:File)=>{if(!f)return; const ok=/\.(las|laz|e57)$/i.test(f.name); if(ok)setFile(f);};
 return <div className="max-w-5xl space-y-6"><div><h1 className="text-3xl font-semibold">Upload Center</h1><p className="mt-1 text-sm text-slate-500">Bring field-collected LiDAR into the Atlas processing pipeline.</p></div>
 <Panel title="Dataset intake" subtitle="Prototype stores the selected file only in the browser. Backend upload comes later."><div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);choose(e.dataTransfer.files?.[0])}} onClick={()=>ref.current?.click()} className={`cursor-pointer rounded-2xl border-2 border-dashed p-16 text-center transition ${drag?"border-blue-400 bg-blue-500/10":"border-slate-700 hover:border-slate-600 hover:bg-slate-900/40"}`}><input ref={ref} type="file" hidden accept=".las,.laz,.e57" onChange={e=>choose(e.target.files?.[0])}/><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-500/10 text-blue-300"><FileUp/></div><h2 className="mt-4 text-base font-medium">Drop LAS, LAZ or E57 here</h2><p className="mt-2 text-sm text-slate-500">or click to browse from your computer</p></div>
 {file&&<div className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-4"><div className="flex items-center gap-3"><div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-300"><FileCheck2 size={18}/></div><div><div className="text-sm font-medium">{file.name}</div><div className="text-xs text-slate-500">{(file.size/1024/1024).toFixed(2)} MB</div></div></div><Badge tone="green">Ready for validation</Badge></div>}
 </Panel>
 <div className="grid gap-4 md:grid-cols-3">{[["1","Upload","Capture source file safely"],["2","Validate","Read header, CRS and integrity"],["3","Process","Run PDAL/GDAL pipeline"]].map(([n,t,d])=><div key={n} className="rounded-2xl border border-slate-800 bg-[#0c1423] p-5"><div className="text-xs text-blue-300">STEP {n}</div><div className="mt-2 font-semibold">{t}</div><div className="mt-1 text-xs text-slate-500">{d}</div></div>)}</div>
 <div className="flex items-center gap-2 rounded-xl border border-amber-500/15 bg-amber-500/5 p-4 text-xs text-amber-200"><AlertTriangle size={16}/> Prototype note: no files leave this machine yet.</div>
 </div>
}
