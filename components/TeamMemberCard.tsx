import type { TeamMember } from "@/types/team";
import Image from "next/image";
import { p } from "@/lib/base";
import { Github, Linkedin, Mail, ExternalLink, GraduationCap } from "lucide-react";

interface Props {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: Props) {
  return (
    <a
      href={p(`/team/${member.slug}`)}
      className="group card-hover flex h-full flex-col p-5"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-cyber-500/20 bg-gradient-to-br from-cyber-900/50 to-slate-800 shadow-inner">
          {member.avatarUrl ? (
            <Image
              src={member.avatarUrl}
              alt={member.name}
              width={64}
              height={64}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-cyber-400">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white truncate group-hover:text-cyber-300 transition-colors">
            {member.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-cyber-400">
            {member.role}
          </p>
          <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {member.shortBio}
          </p>
        </div>
        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-cyber-400 transition-colors" />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {member.researchInterests.slice(0, 3).map((interest) => (
          <span key={interest} className="tag-cyan">
            {interest}
          </span>
        ))}
        {member.researchInterests.length > 3 && (
          <span className="rounded-full bg-slate-700/50 px-2 py-0.5 text-[10px] text-slate-300">
            +{member.researchInterests.length - 3}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-700/50 pt-3">
        {member.socials.github && (
          <span className="text-slate-300 hover:text-cyber-400 transition-colors" aria-label="GitHub">
            <Github className="h-3.5 w-3.5" />
          </span>
        )}
        {member.socials.linkedin && (
          <span className="text-slate-300 hover:text-cyber-400 transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-3.5 w-3.5" />
          </span>
        )}
        {member.socials.email && (
          <span className="text-slate-300 hover:text-cyber-400 transition-colors" aria-label="Email">
            <Mail className="h-3.5 w-3.5" />
          </span>
        )}
        {member.socials.googleScholar && (
          <span className="text-slate-300 hover:text-cyber-400 transition-colors" aria-label="Google Scholar">
            <GraduationCap className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </a>
  );
}
