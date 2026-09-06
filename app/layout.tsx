import "./globals.css";
import { AppShell } from "../components/layout/AppShell";

export const metadata = {
  title: "Atlas LiDAR Platform",
  description: "LiDAR and roadway asset management prototype"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
