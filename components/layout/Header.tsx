"use client";
import { Bell, Search } from "lucide-react";
export function Header() {
  return <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-800/70 bg-[#070d18]/75 px-6 backdrop-blur-xl lg:px-8">
    <div className="relative hidden w-full max-w-xl md:block"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input placeholder="Search projects, routes, surveys..." className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/60"/></div>
    <div className="ml-auto flex items-center gap-3"><button className="rounded-xl border border-slate-800 bg-slate-900/70 p-2.5 text-slate-400 hover:text-white"><Bell size={18}/></button><div className="flex items-center gap-3 border-l border-slate-800 pl-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-200">AX</div><div className="hidden sm:block"><div className="text-sm font-medium">Atlas Operator</div><div className="text-xs text-slate-500">Administrator</div></div></div></div>
  </header>
}
