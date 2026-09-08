"use client";
import {
  FileArchive,
  FileCode2,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { Panel } from "../../components/ui/Panel";
const items = [
  ["GeoPackage", "GPKG", "Roadway asset layers", FileArchive],
  ["GeoJSON", "JSON", "Point / line assets", FileCode2],
  ["LAS / LAZ", "POINT CLOUD", "Processed point cloud", FileArchive],
  ["QC Report", "PDF", "Validation and processing report", FileText],
] as const;
export default function Exports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Export Center</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create GIS-ready deliverables from approved processing jobs.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(([t, fmt, d, Icon]) => (
          <Panel
            key={t}
            title={t}
            subtitle={d}
            action={
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-300">
                <Icon size={18} />
              </div>
            }
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-slate-400">
                {fmt}
              </span>
              <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">
                Generate
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
