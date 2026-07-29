import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
        <a href="/" className="flex items-center gap-2 group">
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
      href={href}
      className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-cyber-300 hover:bg-cyber-500/10 transition-all duration-200"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cyber-500/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="h-5 w-5 rounded bg-cyber-500/20 border border-cyber-500/30 flex items-center justify-center">
              <span className="text-cyber-400 font-mono text-[10px] font-bold">&lt;/&gt;</span>
            </div>
            <span>&copy; {new Date().getFullYear()} CPSSec. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-cyber-400 transition-colors">GitHub</a>
            <span className="text-slate-700">|</span>
            <span className="font-mono text-slate-700">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
