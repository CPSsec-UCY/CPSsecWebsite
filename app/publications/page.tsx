import { getAllPublications } from "@/lib/publications";
import { getAllTeamMembers } from "@/lib/team";
import PublicationsList from "@/components/PublicationsList";
import { BookOpen } from "lucide-react";

export default function PublicationsPage() {
  const publications = getAllPublications();
  const members = getAllTeamMembers().map((m) => ({ slug: m.slug, name: m.name }));

  return (
    <div className="page-shell max-w-5xl">
      <div className="page-heading animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="badge mb-4">
          <BookOpen className="h-3.5 w-3.5 text-cyber-400" />
          <span className="badge-label">Research Output</span>
        </div>
        <h1 className="page-title">Publications</h1>
        <p className="page-subtitle">
          Peer-reviewed papers, conference proceedings, and preprints from the lab.
        </p>
      </div>

      <section className="card p-5 sm:p-6 animate-fade-in-up" style={{ animationDelay: "220ms" }}>
        <PublicationsList publications={publications} teamMembers={members} />
      </section>
    </div>
  );
}
