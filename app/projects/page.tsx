"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { Panel } from "../../components/ui/Panel";
import { Badge } from "../../components/ui/Badge";
const rows = [
  [
    "AT-2026-024",
    "Route 101 South",
    "District 7",
    "Sep 06, 2026",
    "QC Approved",
    "82.4 GB",
  ],
  [
    "AT-2026-023",
    "I-405 Corridor",
    "District 7",
    "Sep 04, 2026",
    "Processing",
    "116.8 GB",
  ],
  [
    "AT-2026-022",
    "SR-99 Survey",
    "District 6",
    "Sep 02, 2026",
    "QC Review",
    "54.2 GB",
  ],
  [
    "AT-2026-021",
    "US-50 East",
    "District 3",
    "Aug 29, 2026",
    "Ready",
    "31.7 GB",
  ],
];
export default function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse survey packages and processing status.
        </p>
      </div>
      <Panel
        title="Project explorer"
        subtitle="Mock data for the client prototype."
        action={
          <button className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-white">
            <SlidersHorizontal size={16} />
          </button>
        }
      >
        <div className="mb-4 flex max-w-md items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
          <Search size={16} className="text-slate-500" />
          <input
            placeholder="Search by project, route or district"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {[
                  "Project",
                  "Route",
                  "District",
                  "Survey date",
                  "Status",
                  "Size",
                ].map((h) => (
                  <th key={h} className="px-3 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r[0]}
                  className="border-b border-slate-800/60 hover:bg-slate-900/50"
                >
                  {r.map((c, i) => (
                    <td key={i} className="px-3 py-4 text-slate-300">
                      {i === 4 ? (
                        <Badge
                          tone={
                            c === "QC Approved" || c === "Ready"
                              ? "green"
                              : c === "Processing"
                                ? "blue"
                                : "amber"
                          }
                        >
                          {c}
                        </Badge>
                      ) : (
                        c
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
