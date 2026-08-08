import { Shield, Cpu, BookOpen, Users, Database, Network, ArrowRight, ExternalLink } from "lucide-react";
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
  const allMembers = getAllTeamMembers().filter((m) => m.role !== "Alumni");
  const members = allMembers.slice(0, 3);
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
      <HeroSection />
      <StatsBanner stats={stats} />
      <SelectedPublications publications={publications} />
      <TeamSpotlight members={members} />
      <FeaturedProjects projects={projects} />
      <PlatformsPreview platforms={platforms} />
    </>
  );
}

function countPeerReviewedPapers(publications: Publication[]) {
  return publications.filter((publication) => {
    return publication.type === "conference" || publication.type === "journal" || publication.type === "workshop";
  }).length;
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-950/30 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="badge mb-4 animate-fade-in-up">
            <Shield className="h-3.5 w-3.5 text-cyber-400" />
            <span className="badge-label">
              KIOS-affiliated Cyber-Physical Systems Security Lab
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            Securing the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyber-300 to-cyber-500">
              World&apos;s Critical Infrastructure
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            CPSSec is a research lab within KIOS at the University of Cyprus, advancing the
            security and resilience of cyber-physical systems through cutting-edge research in
            ICS/OT security, smart grid protection, IoT security, and cyber range technologies.
            Our work is validated on a wide range of physical and virtual testbeds spanning power,
            water, networking, and industrial environments.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
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

function StatsBanner({
  stats,
}: {
  stats: {
    activeTestbeds: number;
    peerReviewedPapers: number;
    industryProjects: number;
    labMembers: number;
  };
}) {
  const statItems = [
    { icon: Cpu, label: "Active Testbeds", value: stats.activeTestbeds },
    { icon: BookOpen, label: "Peer-Reviewed Papers", value: stats.peerReviewedPapers },
    { icon: Database, label: "Industry Projects", value: stats.industryProjects },
    { icon: Users, label: "Lab Members", value: stats.labMembers },
  ];

  return (
    <section className="border-b border-slate-800 bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {statItems.map((stat, i) => (
            <div
              key={stat.label}
              className="card p-4 text-center animate-fade-in-up"
              style={{ animationDelay: `${250 + i * 40}ms` }}
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

function SelectedPublications({ publications }: { publications: Publication[] }) {
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "50ms" }}>
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
            <div key={pub.id} className="animate-fade-in-up" style={{ animationDelay: `${100 + i * 50}ms` }}>
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

function TeamSpotlight({ members }: { members: TeamMember[] }) {
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "50ms" }}>
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
            <div key={member.id} className="animate-fade-in-up" style={{ animationDelay: `${100 + i * 50}ms` }}>
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

function FeaturedProjects({ projects }: { projects: Project[] }) {
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

function PlatformsPreview({ platforms }: { platforms: Platform[] }) {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "50ms" }}>
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
          {platforms.map((platform, i) => {
            const Icon = homePlatformIconMap[platform.icon] || Network;
            return (
              <div
                key={platform.name}
                className="card-hover p-5 animate-fade-in-up"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                <Icon className="h-5 w-5 text-cyber-400" />
                <h3 className="mt-3 text-sm font-semibold text-white">{platform.name}</h3>
                <p className="mt-1 text-xs text-slate-300">{platform.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {platform.tags.map((tag) => (
                    <span key={tag} className="tag-cyan">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
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
