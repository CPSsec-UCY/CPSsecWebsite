import { Shield, Cpu, BookOpen, Users, Database, Network, ArrowRight, ExternalLink } from "lucide-react";
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
      <FeaturedProjects />
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

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
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
              className="inline-flex items-center gap-2 rounded-lg bg-cyber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(6,182,212,0.18)] transition-colors hover:bg-cyber-400"
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

function FeaturedProjects() {
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div>
            <h2 className="section-title">Featured Research Initiatives</h2>
            <p className="section-subtitle">
              Selected European and KIOS-led projects shaping cyber-physical systems security
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="card-hover p-5 animate-fade-in-up"
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{project.name}</h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">{project.description}</p>
                </div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-2">
                  <BookOpen className="h-4 w-4 text-cyber-400" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-cyan">{tag}</span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors"
              >
                Visit project site <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    name: "ACTING",
    description:
      "A European initiative advancing interoperable cyber-training and exercise capabilities for proactive cyber defence across connected operational environments.",
    tags: ["Cyber Training", "EU Project", "Exercise Networks"],
    link: "https://acting-project.eu/",
  },
  {
    name: "CITADEL Range",
    description:
      "An EU defence-focused cyber range programme creating interoperable tools and frameworks to improve advanced training and preparedness for military cyber operations.",
    tags: ["Cyber Range", "Defence", "EU Research"],
    link: "https://www.kios.ucy.ac.cy/projects_kios/citadel-range-cyber-infrastructure-for-training-in-advanced-defence-exercises-and-learning/",
  },
  {
    name: "COCOON",
    description:
      "A Horizon Europe project strengthening the resilience of modern power grids through cooperative cyber-physical protection and real-world pilot demonstrations.",
    tags: ["Energy Systems", "Resilience", "Horizon Europe"],
    link: "https://www.cyber-cocoon.eu/",
  },
  {
    name: "FOCAL",
    description:
      "A post-quantum cryptography project developing practical, interoperable PQC frameworks for edge and critical infrastructure environments.",
    tags: ["Post-Quantum", "Cryptography", "Critical Infrastructure"],
    link: "https://www.focal-pqc.eu/",
  },
];

function PlatformsPreview() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div>
            <h2 className="section-title">Platforms &amp; Testbeds</h2>
            <p className="section-subtitle">
              Active infrastructure for research, training, and experimentation
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
    name: "Cyber Range",
    icon: Network,
    description:
      "A flexible environment for running realistic cyber-physical exercises and attack-defense scenarios for training and research.",
    tags: ["Cyber Range", "Training", "Exercises"],
  },
  {
    name: "ICS Testbed",
    icon: Shield,
    description:
      "A dedicated industrial control systems environment for evaluating OT security, monitoring, and stealthy attack detection research.",
    tags: ["ICS/OT", "Industrial Control", "Security"],
  },
  {
    name: "IoT Testbed",
    icon: Cpu,
    description:
      "An IoT-focused environment for evaluating embedded devices, protocols, and lightweight security mechanisms in constrained settings.",
    tags: ["IoT", "Embedded", "Security"],
  },
];
