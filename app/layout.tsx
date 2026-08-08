import type { Metadata } from "next";
import Image from "next/image";
import { p } from "@/lib/base";
import "./globals.css";

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
      <body className="font-sans scanline min-h-screen">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <a href={p("/")} className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-cyber-500/20 border border-cyber-500/30 flex items-center justify-center group-hover:bg-cyber-500/30 transition-colors">
              <span className="text-cyber-400 font-mono text-sm font-bold">&lt;/&gt;</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-tight">
                CPSSec
              </span>
              <span className="text-[10px] text-slate-300 font-mono leading-tight hidden sm:block">
                Cyber-Physical Systems Security Lab
              </span>
            </div>
          </a>

          <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/70 px-2 py-1.5">
            <a
              href="https://www.kios.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/95 p-1.5 transition-opacity hover:opacity-90"
            >
              <Image
                src={p("/logos/kios-logo.png")}
                alt="KIOS logo"
                width={768}
                height={294}
                className="h-5 w-auto object-contain"
              />
            </a>
            <a
              href="https://www.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/95 p-1.5 transition-opacity hover:opacity-90"
            >
              <Image
                src={p("/logos/ucy-logo.png")}
                alt="University of Cyprus logo"
                width={324}
                height={90}
                className="h-5 w-auto object-contain"
              />
            </a>
            <a
              href="https://www.ece.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white/95 p-1.5 transition-opacity hover:opacity-90"
            >
              <Image
                src={p("/logos/ece-dept-logo.svg")}
                alt="ECE Department logo"
                width={640}
                height={220}
                className="h-5 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
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
      className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:text-white hover:bg-cyber-500/10 transition-all duration-200"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-cyber-500/20 border border-cyber-500/30 flex items-center justify-center">
                <span className="text-cyber-400 font-mono text-[10px] font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-sm font-bold text-white">CPSSec</span>
            </div>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Cyber-Physical Systems Security Lab. Advancing security and
              resilience of critical infrastructure through cutting-edge research.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Affiliated With
            </span>
            <a
              href="https://www.kios.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-3 py-2 transition-opacity hover:opacity-90"
            >
              <Image
                src={p("/logos/kios-logo.png")}
                alt="KIOS Research and Innovation Center of Excellence logo"
                width={768}
                height={294}
                className="h-8 w-auto shrink-0 object-contain"
              />
            </a>
            <a
              href="https://www.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-3 py-2 transition-opacity hover:opacity-90"
            >
              <Image
                src={p("/logos/ucy-logo.png")}
                alt="University of Cyprus logo"
                width={324}
                height={90}
                className="h-6 w-auto shrink-0 object-contain"
              />
            </a>
            <a
              href="https://www.ece.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-3 py-2 transition-opacity hover:opacity-90"
            >
              <Image
                src={p("/logos/ece-dept-logo.svg")}
                alt="ECE Department logo"
                width={640}
                height={220}
                className="h-6 w-auto shrink-0 object-contain"
              />
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Quick Links
            </span>
            <div className="flex flex-col gap-1.5">
              <a href={p("/about")} className="text-xs text-slate-200 hover:text-white transition-colors">About</a>
              <a href={p("/team")} className="text-xs text-slate-200 hover:text-white transition-colors">Team</a>
              <a href={p("/publications")} className="text-xs text-slate-200 hover:text-white transition-colors">Publications</a>
              <a href={p("/platforms")} className="text-xs text-slate-200 hover:text-white transition-colors">Platforms</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} CPSSec — University of Cyprus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
