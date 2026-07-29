import { getAllPublications } from "@/lib/publications";
import { getAllTeamMembers } from "@/lib/team";
import PublicationsList from "@/components/PublicationsList";
import { BookOpen } from "lucide-react";

export default function PublicationsPage() {
  const publications = getAllPublications();
  const members = getAllTeamMembers().map((m) => ({ slug: m.slug, name: m.name }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyber-500/20 bg-cyber-500/10 px-3 py-1 mb-4">
          <BookOpen className="h-3.5 w-3.5 text-cyber-400" />
          <span className="text-xs font-medium text-cyber-300">Research Output</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Publications</h1>
        <p className="mt-2 text-slate-400">
          Peer-reviewed papers, conference proceedings, and preprints from the lab.
        </p>
      </div>

      <PublicationsList publications={publications} teamMembers={members} />
    </div>
  );
}
