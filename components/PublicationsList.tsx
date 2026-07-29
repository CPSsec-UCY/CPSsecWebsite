"use client";

import { useState, useMemo } from "react";
import type { Publication, ResearchDomain } from "@/types/publication";
import type { PublicationType } from "@/types/publication";
import PublicationCard from "./PublicationCard";
import { Search, Filter, X, ArrowUpDown } from "lucide-react";

interface Props {
  publications: Publication[];
  teamMembers: { slug: string; name: string }[];
}

type SortKey = "newest" | "oldest" | "type" | "title";

const typeOrder: Record<PublicationType, number> = {
  journal: 0,
  conference: 1,
  workshop: 2,
  preprint: 3,
  thesis: 4,
};

export default function PublicationsList({ publications, teamMembers }: Props) {
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<ResearchDomain | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("newest");

  const years = useMemo(() => {
    const y = new Set(publications.map((p) => p.year));
    return Array.from(y).sort((a, b) => b - a);
  }, [publications]);

  const domains = useMemo(() => {
    const d = new Set<ResearchDomain>();
    publications.forEach((p) => p.domain.forEach((dom) => d.add(dom)));
    return Array.from(d).sort();
  }, [publications]);

  const filtered = useMemo(() => {
    let result = publications.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inAuthors = p.authors.some((a) => a.toLowerCase().includes(q));
        const inAbstract = p.abstract?.toLowerCase().includes(q);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inAuthors && !inAbstract && !inTags) return false;
      }
      if (selectedYear !== null && p.year !== selectedYear) return false;
      if (selectedDomain !== null && !p.domain.includes(selectedDomain)) return false;
      if (selectedAuthor !== null && !p.authorSlugs.includes(selectedAuthor)) return false;
      return true;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.year - a.year || a.title.localeCompare(b.title);
        case "oldest":
          return a.year - b.year || a.title.localeCompare(b.title);
        case "type":
          return typeOrder[a.type] - typeOrder[b.type] || b.year - a.year;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [publications, search, selectedYear, selectedDomain, selectedAuthor, sortBy]);

  const hasFilters = search || selectedYear !== null || selectedDomain !== null || selectedAuthor !== null;

  function clearFilters() {
    setSearch("");
    setSelectedYear(null);
    setSelectedDomain(null);
    setSelectedAuthor(null);
  }

  return (
    <div>
      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search publications by title, author, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700/50 bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyber-500/50 focus:ring-1 focus:ring-cyber-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <div className="flex flex-wrap gap-1.5">
            <select
              value={selectedYear ?? ""}
              onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
              className="rounded-md border border-slate-700/50 bg-slate-800/60 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-cyber-500/40"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              value={selectedDomain ?? ""}
              onChange={(e) => setSelectedDomain(e.target.value ? (e.target.value as ResearchDomain) : null)}
              className="rounded-md border border-slate-700/50 bg-slate-800/60 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-cyber-500/40"
            >
              <option value="">All Domains</option>
              {domains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={selectedAuthor ?? ""}
              onChange={(e) => setSelectedAuthor(e.target.value || null)}
              className="rounded-md border border-slate-700/50 bg-slate-800/60 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-cyber-500/40"
            >
              <option value="">All Authors</option>
              {teamMembers.map((m) => (
                <option key={m.slug} value={m.slug}>{m.name}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-md border border-slate-700/50 bg-slate-800/60 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-cyber-500/40"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="type">By Type</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 p-12 text-center">
          <p className="text-sm text-slate-300">No publications match your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((pub, i) => (
            <div key={pub.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 40}ms` }}>
              <PublicationCard publication={pub} showAbstract />
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400">
        Showing {filtered.length} of {publications.length} publications
      </p>
    </div>
  );
}
