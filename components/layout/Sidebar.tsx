"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  FileOutput,
  FolderKanban,
  Gauge,
  Layers3,
  Settings,
  Upload,
  Workflow,
} from "lucide-react";

const items = [
  ["Dashboard", "/dashboard", Gauge],
  ["Upload", "/upload", Upload],
  ["Projects", "/projects", FolderKanban],
  ["Processing", "/processing", Workflow],
  ["3D Viewer", "/viewer", Layers3],
  ["Exports", "/exports", FileOutput],
  ["Settings", "/settings", Settings],
] as const;

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-slate-800/80 bg-[#09111f]/95 backdrop-blur-xl transition-all ${collapsed ? "w-20" : "w-62"}`}
    >
      <div className="flex h-[72px] items-center justify-between border-b border-slate-800/80 px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/15 ring-1 ring-blue-400/20">
            <Database size={21} className="text-blue-300" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold tracking-[0.25em] text-blue-300">
                ATLAS
              </div>
              <div className="text-[10px] text-slate-500">LiDAR PLATFORM</div>
            </div>
          )}
        </div>
      </div>
      <nav className="space-y-2 px-3 py-5">
        {items.map(([label, href, Icon]) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? "bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/15" : "text-slate-400 hover:bg-slate-800/70 hover:text-white"}`}
            >
              <Icon
                size={19}
                className={
                  active
                    ? "text-blue-300"
                    : "text-slate-500 group-hover:text-slate-300"
                }
              />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={onToggle}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-400 hover:text-white"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
