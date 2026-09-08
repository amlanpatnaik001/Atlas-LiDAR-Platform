"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <div
        className={
          collapsed ? "pl-[80px] transition-all" : "pl-[248px] transition-all"
        }
      >
        <Header />
        <main className="min-h-[calc(100vh-72px)] px-6 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
