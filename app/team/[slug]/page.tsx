import { notFound } from "next/navigation";
import { getAllTeamMembers, getTeamMemberBySlug } from "@/lib/team";
import { getPublicationsBySlug } from "@/lib/publications";
import { p } from "@/lib/base";
import PublicationCard from "@/components/PublicationCard";
import { Github, Linkedin, Mail, GraduationCap, ExternalLink, ArrowLeft, BookOpen } from "lucide-react";

export async function generateStaticParams() {
  const members = getAllTeamMembers();
  return members.map((member) => ({ slug: member.slug }));
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = getTeamMemberBySlug(params.slug);
  if (!member) notFound();

  const publications = getPublicationsBySlug(member.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <a
        href={p("/team")}
        className="mb-6 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyber-400 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Team
      </a>

      <div className="card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-600/30 bg-gradient-to-br from-cyber-900/50 to-slate-800">
            {member.avatarUrl ? (
              <img
                src={p(member.avatarUrl)}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-cyber-400">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {member.name}
              </h1>
              <p className="text-sm font-medium text-cyber-400">{member.role}</p>
              <p className="text-xs text-slate-300">Joined {member.joined}</p>
            </div>

            <p className="mt-4 text-sm text-slate-200 leading-relaxed">
              {member.bio}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {member.researchInterests.map((interest) => (
                <span key={interest} className="tag-cyan">{interest}</span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              {member.socials.github && (
                <a
                  href={`https://github.com/${member.socials.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-cyber-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={`https://linkedin.com/in/${member.socials.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-cyber-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {member.socials.email && (
                <a
                  href={`mailto:${member.socials.email}`}
                  className="text-slate-300 hover:text-cyber-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
              {member.socials.googleScholar && (
                <a
                  href={member.socials.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-cyber-400 transition-colors"
                  aria-label="Google Scholar"
                >
                  <GraduationCap className="h-4 w-4" />
                </a>
              )}
              {member.socials.orcid && (
                <a
                  href={`https://orcid.org/${member.socials.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-cyber-400 transition-colors"
                  aria-label="ORCID"
                >
                  <span className="text-[10px] font-bold font-mono">ORCID</span>
                </a>
              )}
              {member.socials.website && (
                <a
                  href={member.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-cyber-400 transition-colors"
                  aria-label="Website"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-cyber-400" />
          <h2 className="text-lg font-semibold text-white">Publications</h2>
          <span className="text-xs text-slate-400">({publications.length})</span>
        </div>

        {publications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-12 text-center">
            <p className="text-sm text-slate-400">
              No publications indexed yet for this member.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {publications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} showAbstract />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
