export function Badge({ children, tone="neutral" }: { children: React.ReactNode; tone?: "neutral"|"blue"|"green"|"amber"|"red" }) {
  const styles={neutral:"bg-slate-800/70 text-slate-300",blue:"bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/15",green:"bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/15",amber:"bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/15",red:"bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/15"};
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[tone]}`}>{children}</span>;
}
