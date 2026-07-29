import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { p } from "@/lib/base";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CPSSec | Cyber-Physical Systems Security Lab",
  description:
    "Advancing the security of cyber-physical systems through cutting-edge research in ICS/OT, smart grid, IoT, and cyber range technologies.",
  keywords: [
    "cyber-physical systems",
    "ICS security",
    "OT security",
    "smart grid",
    "IoT security",
    "cyber range",
    "critical infrastructure",
  ],
  openGraph: {
    title: "CPSSec | Cyber-Physical Systems Security Lab",
    description:
      "Advancing the security of cyber-physical systems through cutting-edge research.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans scanline min-h-screen`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyber-500/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href={p("/")} className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-cyber-500/20 border border-cyber-500/30 flex items-center justify-center group-hover:bg-cyber-500/30 transition-colors">
            <span className="text-cyber-400 font-mono text-sm font-bold">&lt;/&gt;</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-tight leading-tight">
              CPSSec
            </span>
            <span className="text-[10px] text-slate-500 font-mono leading-tight hidden sm:block">
              Cyber-Physical Systems Security Lab
            </span>
          </div>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/team">Team</NavLink>
          <NavLink href="/publications">Publications</NavLink>
          <NavLink href="/platforms">Platforms</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={p(href)}
      className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-cyber-300 hover:bg-cyber-500/10 transition-all duration-200"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cyber-500/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-cyber-500/20 border border-cyber-500/30 flex items-center justify-center">
                <span className="text-cyber-400 font-mono text-[10px] font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-sm font-bold text-white">CPSSec</span>
            </div>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Cyber-Physical Systems Security Lab. Advancing security and
              resilience of critical infrastructure through cutting-edge research.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Affiliated With
            </span>
            <a
              href="https://www.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyber-400 transition-colors"
            >
              <svg viewBox="0 0 40 40" className="h-6 w-6 shrink-0" fill="none">
                <rect width="40" height="40" rx="8" className="fill-slate-800" />
                <text x="20" y="24" textAnchor="middle" className="fill-cyber-400 text-[14px] font-bold" fontFamily="system-ui">UCY</text>
              </svg>
              <span>University of Cyprus</span>
            </a>
            <a
              href="https://www.kios.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyber-400 transition-colors"
            >
              <svg viewBox="0 0 40 40" className="h-6 w-6 shrink-0" fill="none">
                <rect width="40" height="40" rx="8" className="fill-slate-800" />
                <text x="20" y="24" textAnchor="middle" className="fill-cyber-400 text-[11px] font-bold" fontFamily="system-ui">KIOS</text>
              </svg>
              <span>KIOS Centre of Excellence</span>
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Quick Links
            </span>
            <div className="flex flex-col gap-1.5">
              <a href={p("/about")} className="text-xs text-slate-400 hover:text-cyber-400 transition-colors">About</a>
              <a href={p("/team")} className="text-xs text-slate-400 hover:text-cyber-400 transition-colors">Team</a>
              <a href={p("/publications")} className="text-xs text-slate-400 hover:text-cyber-400 transition-colors">Publications</a>
              <a href={p("/platforms")} className="text-xs text-slate-400 hover:text-cyber-400 transition-colors">Platforms</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-cyber-500/5 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} CPSSec — University of Cyprus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
