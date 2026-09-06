"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  CheckCircle2,
  Database,
  HardDrive,
  Map,
  Activity,
  Clock3,
} from "lucide-react";
import { StatCard } from "../../components/cards/StatCard";
import { Panel } from "../../components/ui/Panel";
import { Badge } from "../../components/ui/Badge";

export default function Dashboard() {
  const activity = [
    "Route 101 survey package uploaded",
    "EPSG:26911 detected",
    "Ground classification queued",
    "QC review requested",
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[11px] text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Local
            prototype
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Mission Control
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Central workspace for LiDAR datasets, processing and roadway assets.
          </p>
        </div>
        <Link
          href="/upload"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium hover:bg-blue-500"
        >
          <ArrowUpRight size={17} /> Upload dataset
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active projects"
          value="24"
          delta="+3 this month"
          icon={Map}
        />
        <StatCard
          title="Processing jobs"
          value="03"
          delta="2 running now"
          icon={Activity}
        />
        <StatCard
          title="QC approved"
          value="18"
          delta="75% of projects"
          icon={CheckCircle2}
        />
        <StatCard
          title="Local workspace"
          value="1.2 TB"
          delta="68% capacity"
          icon={HardDrive}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="3D workspace"
          subtitle="Web viewer will stream processed point-cloud tiles here."
          action={<Badge tone="blue">Viewer ready</Badge>}
        >
          <div className="relative h-[360px] overflow-hidden rounded-xl border border-slate-800 bg-[#07101b]">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(71,85,105,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(71,85,105,.12) 1px,transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
            <div className="absolute left-1/2 top-1/2 h-44 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-blue-400/30 rotate-[-15deg] shadow-[0_0_80px_rgba(59,130,246,.08)]" />
            <div className="absolute left-1/2 top-[52%] h-1 w-72 -translate-x-1/2 rotate-[-9deg] bg-blue-400/40 blur-[1px]" />
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center">
              <Link
                href="/viewer"
                className="rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-slate-300 hover:text-white"
              >
                Open 3D viewer
              </Link>
            </div>
          </div>
        </Panel>
        <Panel
          title="Recent activity"
          subtitle="Latest events in the workspace"
        >
          <div className="space-y-1">
            {activity.map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl px-2 py-3 hover:bg-slate-800/40"
              >
                <div className="mt-0.5 rounded-lg bg-slate-800 p-2 text-slate-400">
                  {i === 0 ? (
                    <Database size={15} />
                  ) : i === 1 ? (
                    <Map size={15} />
                  ) : i === 2 ? (
                    <Clock3 size={15} />
                  ) : (
                    <CheckCircle2 size={15} />
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-200">{item}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {i + 1}0 minutes ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
