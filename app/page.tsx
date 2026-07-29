import { Shield, Cpu, BookOpen, Users, Database, Network, ArrowRight } from "lucide-react";
import { getAllPublications } from "@/lib/publications";
import { getAllTeamMembers } from "@/lib/team";
import { p } from "@/lib/base";
import PublicationCard from "@/components/PublicationCard";
import TeamMemberCard from "@/components/TeamMemberCard";

export default function HomePage() {
  const publications = getAllPublications().slice(0, 4);
  const members = getAllTeamMembers().filter((m) => m.role !== "Alumni").slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatsBanner />
      <SelectedPublications publications={publications} />
      <TeamSpotlight members={members} />
      <PlatformsPreview />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-950/30 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="badge mb-4 animate-fade-in-up">
            <Shield className="h-3.5 w-3.5 text-cyber-400" />
            <span className="badge-label">
              Cyber-Physical Systems Security Research Lab
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Securing the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-300 to-cyber-500">
              World&apos;s Critical Infrastructure
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            CPSSec advances the security and resilience of cyber-physical systems
            through cutting-edge research in ICS/OT security, smart grid protection,
            IoT security, and cyber range technologies.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <a
              href={p("/publications")}
              className="inline-flex items-center gap-2 rounded-lg bg-cyber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyber-400 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Browse Publications
            </a>
            <a
              href={p("/team")}
              className="inline-flex items-center gap-2 rounded-lg border border-cyber-500/30 px-4 py-2.5 text-sm font-semibold text-cyber-300 hover:bg-cyber-500/10 transition-colors"
            >
              <Users className="h-4 w-4" />
              Meet the Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  const stats = [
    { icon: Cpu, label: "Active Testbeds", value: "4" },
    { icon: BookOpen, label: "Peer-Reviewed Papers", value: "9" },
    { icon: Database, label: "Industry Projects", value: "6" },
    { icon: Users, label: "Lab Members", value: "6" },
  ];

  return (
    <section className="border-b border-slate-800 bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card p-4 text-center animate-fade-in-up"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <stat.icon className="mx-auto h-5 w-5 text-cyber-400" />
              <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedPublications({ publications }: { publications: any[] }) {
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div>
            <h2 className="section-title">Selected Publications</h2>
            <p className="section-subtitle">
              Recent contributions from the lab
            </p>
          </div>
          <a
            href={p("/publications")}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {publications.map((pub, i) => (
            <div key={pub.id} className="animate-fade-in-up" style={{ animationDelay: `${200 + i * 80}ms` }}>
              <PublicationCard publication={pub} showAbstract />
            </div>
          ))}
        </div>

        <a
          href={p("/publications")}
          className="mt-6 inline-flex sm:hidden items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors"
        >
          View All Publications <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

function TeamSpotlight({ members }: { members: any[] }) {
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div>
            <h2 className="section-title">Team Spotlight</h2>
            <p className="section-subtitle">Meet our researchers</p>
          </div>
          <a
            href={p("/team")}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors"
          >
            Meet Everyone <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <div key={member.id} className="animate-fade-in-up" style={{ animationDelay: `${200 + i * 80}ms` }}>
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>

        <a
          href={p("/team")}
          className="mt-6 inline-flex sm:hidden items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors"
        >
          Meet Everyone <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

function PlatformsPreview() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div>
            <h2 className="section-title">Platforms &amp; Testbeds</h2>
            <p className="section-subtitle">
              Hardware and software cyber ranges
            </p>
          </div>
          <a
            href={p("/platforms")}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors"
          >
            Explore Platforms <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className="card-hover p-5 animate-fade-in-up"
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              <p.icon className="h-5 w-5 text-cyber-400" />
              <h3 className="mt-3 text-sm font-semibold text-white">{p.name}</h3>
              <p className="mt-1 text-xs text-slate-300">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="tag-cyan">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <a
          href={p("/platforms")}
          className="mt-6 inline-flex sm:hidden items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors"
        >
          Explore Platforms <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

const platforms = [
  {
    name: "PowerRanger",
    icon: Network,
    description:
      "Open-source smart grid cyber range with hardware-in-the-loop simulation and real IEC 61850 communications.",
    tags: ["Smart Grid", "HIL", "IEC 61850"],
  },
  {
    name: "ICS Honeynet",
    icon: Shield,
    description:
      "Distributed high-interaction honeypot network emulating PLCs, RTUs, and HMIs across multiple vendor protocols.",
    tags: ["ICS/OT", "Honeypot", "Threat Intel"],
  },
  {
    name: "Firmware Analysis Rig",
    icon: Cpu,
    description:
      "Automated firmware extraction, emulation, and vulnerability discovery pipeline for embedded CPS devices.",
    tags: ["Embedded", "Firmware", "TEE"],
  },
];
