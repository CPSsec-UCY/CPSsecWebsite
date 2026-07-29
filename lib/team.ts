import fs from "fs";
import path from "path";
import type { TeamMember } from "@/types/team";

const teamDir = path.join(process.cwd(), "content/team");

export function getAllTeamMembers(): TeamMember[] {
  const files = fs.readdirSync(teamDir).filter((f) => f.endsWith(".json"));
  const members: TeamMember[] = files.map((f) => {
    const raw = fs.readFileSync(path.join(teamDir, f), "utf-8");
    return JSON.parse(raw);
  });
  members.sort((a, b) => a.sortOrder - b.sortOrder);
  return members;
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return getAllTeamMembers().find((m) => m.slug === slug);
}

export function getTeamMembersByRole(role: TeamMember["role"]): TeamMember[] {
  return getAllTeamMembers().filter((m) => m.role === role);
}

export function getRoleGroups(): Record<string, TeamMember[]> {
  const members = getAllTeamMembers();
  const groups: Record<string, TeamMember[]> = {};
  for (const m of members) {
    if (!groups[m.role]) groups[m.role] = [];
    groups[m.role].push(m);
  }
  return groups;
}
