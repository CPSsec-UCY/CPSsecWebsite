import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060606]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href={p("/")} className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyber-500 font-mono text-sm font-bold text-white shadow-[0_8px_24px_rgba(2,193,115,0.35)] transition-transform duration-200 group-hover:scale-105">
            &lt;/&gt;
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white">
              CPSSec
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-cyber-400 sm:block">
              Cyber-Physical Security Lab
            </span>
          </div>
        </a>

        <nav className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/team">Team</NavLink>
          <NavLink href="/publications">Publications</NavLink>
          <NavLink href="/platforms">Platforms</NavLink>
        </nav>

        <a
          href="https://www.kios.ucy.ac.cy/contact-details/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill !px-5 !py-2.5 text-xs"
        >
          Get in Touch
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={p(href)}
      className="rounded-full px-3.5 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 hover:bg-cyber-500/15 hover:text-white"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyber-500 font-mono text-sm font-bold text-white">
                &lt;/&gt;
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">CPSSec</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
              Cyber-Physical Systems Security Lab. Advancing the security and
              resilience of critical infrastructure through cutting-edge research.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Affiliated With
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.kios.ucy.ac.cy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-3 py-2 transition-opacity hover:opacity-90"
                >
                  <Image
                    src={p("/logos/kios-logo.png")}
                    alt="KIOS Research and Innovation Center of Excellence logo"
                    width={768}
                    height={294}
                    className="h-7 w-auto shrink-0 object-contain"
                  />
                </a>
                <a
                  href="https://www.ucy.ac.cy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-3 py-2 transition-opacity hover:opacity-90"
                >
                  <Image
                    src={p("/logos/ucy-logo.png")}
                    alt="University of Cyprus logo"
                    width={324}
                    height={90}
                    className="h-6 w-auto shrink-0 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Explore</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              <a href={p("/about")} className="w-fit text-sm text-slate-300 transition-colors hover:text-cyber-300">About Us</a>
              <a href={p("/team")} className="w-fit text-sm text-slate-300 transition-colors hover:text-cyber-300">Our Team</a>
              <a href={p("/publications")} className="w-fit text-sm text-slate-300 transition-colors hover:text-cyber-300">Publications</a>
              <a href={p("/platforms")} className="w-fit text-sm text-slate-300 transition-colors hover:text-cyber-300">Platforms</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Research Areas</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {["ICS/OT Security", "Smart Grid Protection", "IoT Security", "Cyber Ranges", "Network Security"].map((area) => (
                <a key={area} href={p("/about")} className="w-fit text-sm text-slate-300 transition-colors hover:text-cyber-300">
                  {area}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Contact</h3>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-slate-300">
              <span>1 Panepistimiou Avenue,</span>
              <span>2109 Aglantzia, Nicosia, Cyprus</span>
              <a href="tel:+35722893450" className="w-fit transition-colors hover:text-cyber-300">+357 22 893 450</a>
              <a href="mailto:kios@ucy.ac.cy" className="w-fit transition-colors hover:text-cyber-300">kios@ucy.ac.cy</a>
            </div>
            <a
              href="https://www.kios.ucy.ac.cy/contact-details/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill mt-5 !px-5 !py-2.5 text-xs"
            >
              Get Free Estimate
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} CPSSec — University of Cyprus. All rights reserved.</span>
          <span className="font-medium uppercase tracking-[0.2em] text-cyber-400">Securing Critical Infrastructure</span>
        </div>
      </div>
    </footer>
  );
}
