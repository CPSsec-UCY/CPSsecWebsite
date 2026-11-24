import Image from "next/image";
import { Shield, Cpu, BookOpen, Users, Database, Network, ArrowRight, ArrowUpRight, CheckCircle2, Server, Lock } from "lucide-react";
import { getAllPublications } from "@/lib/publications";
import { getAllTeamMembers } from "@/lib/team";
import { getAllPlatforms, getActivePlatforms } from "@/lib/platforms";
import { getAllProjects } from "@/lib/projects";
import { p } from "@/lib/base";
import PublicationCard from "@/components/PublicationCard";
import TeamMemberCard from "@/components/TeamMemberCard";
import type { Publication } from "@/types/publication";
import type { TeamMember } from "@/types/team";
import type { Platform } from "@/types/platform";
import type { Project } from "@/types/project";

const homePlatformIconMap: Record<Platform["icon"], any> = {
  Network,
  Shield,
  Cpu,
  Monitor: Network,
};

export default function HomePage() {
  const allPublications = getAllPublications();
  const publications = allPublications.slice(0, 4);
  const featured = allPublications[0];
  const allMembers = getAllTeamMembers().filter((m) => m.role !== "Alumni");
  const members = allMembers.slice(0, 3);
  const avatarMembers = allMembers.filter((m) => m.avatarUrl).slice(0, 6);
  const projects = getAllProjects();
  const platforms = getAllPlatforms();

  const stats = {
    activeTestbeds: getActivePlatforms().length,
    peerReviewedPapers: countPeerReviewedPapers(allPublications),
    industryProjects: projects.length,
    labMembers: allMembers.length,
  };

  return (
    <>
      <HeroSection stats={stats} featured={featured} avatars={avatarMembers} />
      <TrustedStrip />
      <ResearchThemes />
      <AboutPreview />
      <PlatformsPreview platforms={platforms} />
      <ProjectsPreview projects={projects} />
      <ProcessSection />
      <SelectedPublications publications={publications} />
      <TeamSpotlight members={members} />
      <ContactCta />
    </>
  );
}

function countPeerReviewedPapers(publications: Publication[]) {
  return publications.filter((publication) => {
    return publication.type === "conference" || publication.type === "journal" || publication.type === "workshop";
  }).length;
}

function HeroSection({
  stats,
  featured,
  avatars,
}: {
  stats: { activeTestbeds: number; peerReviewedPapers: number; industryProjects: number; labMembers: number };
  featured?: Publication;
  avatars: TeamMember[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(2,193,115,0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(2,193,115,0.07),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
        <div className="animate-fade-in-up">
          <span className="section-eyebrow">AI-Powered Cybersecurity Research</span>
          <h1 className="mt-2 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Securing Systems.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-300 to-cyber-500">
              Creating Resilience.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            CPSSec is a research lab within KIOS at the University of Cyprus, advancing the
            security of cyber-physical systems — from power grids and water networks to
            industrial control systems and IoT.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={p("/publications")} className="btn-pill">
              <BookOpen className="h-4 w-4" />
              Browse Publications
            </a>
            <a href={p("/team")} className="btn-pill-outline">
              <Users className="h-4 w-4" />
              Meet the Team
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              {avatars.map((m) => (
                <span key={m.id} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#060606] bg-slate-800">
                  {m.avatarUrl ? (
                    <Image src={m.avatarUrl} alt={m.name} width={40} height={40} className="h-full w-full object-cover" />
                  ) : null}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-300">
              <span className="font-bold text-white">{stats.labMembers} researchers</span> securing
              critical infrastructure
            </p>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <div className="card p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="section-eyebrow !mb-0">Lab at a glance</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyber-500/15 px-3 py-1 text-[11px] font-semibold text-cyber-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyber-400" />
                Active research
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { icon: Cpu, label: "Active Testbeds", value: stats.activeTestbeds },
                { icon: BookOpen, label: "Peer-Reviewed Papers", value: stats.peerReviewedPapers },
                { icon: Database, label: "Research Initiatives", value: stats.industryProjects },
                { icon: Users, label: "Lab Members", value: stats.labMembers },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <stat.icon className="h-5 w-5 text-cyber-400" />
                  <p className="mt-2 text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
            {featured ? (
              <a href={p("/publications")} className="group mt-5 block rounded-2xl border border-cyber-500/25 bg-cyber-500/10 p-4 transition-colors hover:bg-cyber-500/15">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyber-300">Featured publication</p>
                <p className="mt-1.5 text-sm font-semibold leading-snug text-white group-hover:text-cyber-200">
                  {featured.title}
                </p>
                <p className="mt-1 text-xs text-slate-300">{featured.venue} · {featured.year}</p>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedStrip() {
  return (
    <section className="border-b border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          Affiliated with
        </span>
        <a href="https://www.kios.ucy.ac.cy" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white px-4 py-2 transition-opacity hover:opacity-90">
          <Image src={p("/logos/kios-logo.png")} alt="KIOS logo" width={768} height={294} className="h-6 w-auto object-contain" />
        </a>
        <a href="https://www.ucy.ac.cy" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white px-4 py-2 transition-opacity hover:opacity-90">
          <Image src={p("/logos/ucy-logo.png")} alt="University of Cyprus logo" width={324} height={90} className="h-5 w-auto object-contain" />
        </a>
      </div>
    </section>
  );
}

const researchThemes = [
  { title: "ICS/OT Security", description: "SCADA, PLC, and RTU security, protocol analysis, and network segmentation for industrial environments.", icon: Cpu },
  { title: "Smart Grid Protection", description: "Intrusion detection, energy theft prevention, and resilient control for modern power grids.", icon: Network },
  { title: "IoT Security", description: "Lightweight intrusion detection, federated learning at the edge, and firmware security.", icon: Lock },
  { title: "Cyber Ranges", description: "Hardware-in-the-loop simulation and federated training platforms for security exercises.", icon: Server },
  { title: "Network Security", description: "Anomaly detection, botnet profiling, and threat intelligence for critical networks.", icon: Shield },
  { title: "Post-Quantum Cryptography", description: "PQC benchmarking and deployment for resource-constrained embedded devices.", icon: BookOpen },
];

function ResearchThemes() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl animate-fade-in-up">
          <span className="section-eyebrow">Latest research</span>
          <h2 className="section-title">Technology that makes infrastructure safer</h2>
          <p className="section-subtitle">
            Six research threads, one goal: dependable security for the systems society relies on.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchThemes.map((theme, i) => (
            <a
              key={theme.title}
              href={p("/about")}
              className="card-hover group p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyber-500/15 text-cyber-300 transition-colors group-hover:bg-cyber-500 group-hover:text-white">
                <theme.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{theme.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{theme.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyber-300 transition-colors group-hover:text-cyber-200">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  const points = [
    "Measurement-driven security with strong theoretical foundations",
    "Practical, deployable defences validated on physical testbeds",
    "EU-funded research across energy, water, and industrial systems",
  ];
  return (
    <section className="border-b border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="animate-fade-in-up">
          <span className="section-eyebrow">About us</span>
          <h2 className="section-title">It&apos;s not just about the gadgets — it&apos;s about trust</h2>
          <p className="section-subtitle">
            CPSSec operates within KIOS at the University of Cyprus, combining control systems,
            computer networks, and cybersecurity expertise to protect critical infrastructure.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyber-400" />
                <p className="text-sm leading-relaxed text-slate-200">{point}</p>
              </div>
            ))}
          </div>
          <a href={p("/about")} className="btn-pill mt-8">
            More About Us
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <div className="card p-6">
            <Shield className="h-6 w-6 text-cyber-400" />
            <p className="mt-3 text-2xl font-extrabold text-white">ICS/OT</p>
            <p className="mt-1 text-sm text-slate-300">Forensics, anomaly detection, and vulnerability discovery.</p>
          </div>
          <div className="card p-6 sm:mt-8">
            <Network className="h-6 w-6 text-cyber-400" />
            <p className="mt-3 text-2xl font-extrabold text-white">Smart Grid</p>
            <p className="mt-1 text-sm text-slate-300">Protection for interconnected power systems.</p>
          </div>
          <div className="card p-6">
            <Cpu className="h-6 w-6 text-cyber-400" />
            <p className="mt-3 text-2xl font-extrabold text-white">Embedded</p>
            <p className="mt-1 text-sm text-slate-300">PQC and fuzzing for constrained devices.</p>
          </div>
          <div className="card p-6 sm:mt-8">
            <Server className="h-6 w-6 text-cyber-400" />
            <p className="mt-3 text-2xl font-extrabold text-white">Ranges</p>
            <p className="mt-1 text-sm text-slate-300">Federated cyber training environments.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformsPreview({ platforms }: { platforms: Platform[] }) {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 animate-fade-in-up">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Features</span>
            <h2 className="section-title">The future starts with secure testbeds</h2>
            <p className="section-subtitle">Active infrastructure for research, training, and experimentation.</p>
          </div>
          <a href={p("/platforms")} className="hidden items-center gap-1 text-sm font-semibold text-cyber-300 hover:text-cyber-200 sm:inline-flex">
            Explore Platforms <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform, i) => {
            const Icon = homePlatformIconMap[platform.icon] || Network;
            return (
              <div key={platform.name} className="card-hover p-6 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <Icon className="h-6 w-6 text-cyber-400" />
                <h3 className="mt-4 text-base font-bold text-white">{platform.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{platform.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {platform.tags.map((tag) => (
                    <span key={tag} className="tag-cyan">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview({ projects }: { projects: Project[] }) {
  return (
    <section className="border-b border-white/10 bg-black/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl animate-fade-in-up">
          <span className="section-eyebrow">Latest portfolio</span>
          <h2 className="section-title">Research that protects critical infrastructure</h2>
          <p className="section-subtitle">Selected European and KIOS-led initiatives shaping cyber-physical systems security.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, i) => (
            <div key={project.name} className="card-hover p-6 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>
                </div>
                <div className="rounded-xl border border-cyber-500/25 bg-cyber-500/10 p-2">
                  <BookOpen className="h-4 w-4 text-cyber-300" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-cyan">{tag}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyber-300 hover:text-cyber-200">
                Visit project site <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { step: "01", title: "Discover", description: "Measure real systems, profile threats, and identify where defences fail." },
  { step: "02", title: "Prototype", description: "Build data-driven mechanisms with strong theoretical foundations." },
  { step: "03", title: "Validate", description: "Test on physical and virtual testbeds, then deploy with partners." },
];

function ProcessSection() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl animate-fade-in-up">
          <span className="section-eyebrow">Work process</span>
          <h2 className="section-title">From idea to deployed defence</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((item, i) => (
            <div key={item.step} className="card-hover p-6 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="text-sm font-extrabold tracking-[0.2em] text-cyber-400">{item.step}</span>
              <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedPublications({ publications }: { publications: Publication[] }) {
  return (
    <section className="border-b border-white/10 bg-black/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-in-up">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Latest research output</span>
            <h2 className="section-title">Peer-reviewed results</h2>
            <p className="section-subtitle">Recent contributions from the lab.</p>
          </div>
          <a href={p("/publications")} className="hidden items-center gap-1 text-sm font-semibold text-cyber-300 hover:text-cyber-200 sm:inline-flex">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {publications.map((pub, i) => (
            <div key={pub.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
              <PublicationCard publication={pub} showAbstract />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSpotlight({ members }: { members: TeamMember[] }) {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-in-up">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Our people</span>
            <h2 className="section-title">Meet the researchers</h2>
            <p className="section-subtitle">An interdisciplinary team across cybersecurity, control, and embedded systems.</p>
          </div>
          <a href={p("/team")} className="hidden items-center gap-1 text-sm font-semibold text-cyber-300 hover:text-cyber-200 sm:inline-flex">
            Meet Everyone <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <div key={member.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyber-600 via-cyber-500 to-cyber-400 p-8 sm:p-12 animate-fade-in-up">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_55%)]" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Newsletter & contact</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Have a critical infrastructure challenge? Let&apos;s talk.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                We collaborate with academic and industry partners across Europe. Reach out through KIOS to discuss research, testbeds, and projects.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.kios.ucy.ac.cy/contact-details/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#060606] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black"
              >
                Contact KIOS
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={p("/platforms")} className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10">
                Explore Platforms
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
