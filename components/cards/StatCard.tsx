import { LucideIcon } from "lucide-react";
export function StatCard({
  title,
  value,
  delta,
  icon: Icon,
}: {
  title: string;
  value: string;
  delta: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#0c1423]/85 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
            {title}
          </p>
          <div className="mt-2 text-2xl font-semibold">{value}</div>
          <div className="mt-2 text-xs text-emerald-300">{delta}</div>
        </div>
        <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-300">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}
