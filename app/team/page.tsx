import { getRoleGroups } from "@/lib/team";
import TeamMemberCard from "@/components/TeamMemberCard";
import { Users } from "lucide-react";

export default function TeamPage() {
  const groups = getRoleGroups();

  const roleOrder = [
    "Lab Director",
    "Faculty",
    "Postdoctoral Researcher",
    "PhD Candidate",
    "Research Associate",
    "Software Engineer",
    "MSc Student",
    "Research Assistant",
    "Alumni",
  ];

  return (
    <div className="page-shell">
      <div className="mb-10">
        <div className="badge mb-4">
          <Users className="h-3.5 w-3.5 text-cyber-400" />
          <span className="badge-label">Our People</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Team</h1>
        <p className="mt-2 text-slate-300 max-w-2xl">
          Our interdisciplinary team brings together expertise in cybersecurity,
          control systems, critical infrastructure protection, and embedded systems.
        </p>
      </div>

      {roleOrder
        .filter((role) => groups[role])
        .map((role) => (
          <section key={role} className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-cyber-300">{role}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groups[role].map((member, i) => (
                <div key={member.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
