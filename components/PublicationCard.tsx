"use client";

import type { Publication } from "@/types/publication";
import { FileText, Copy, ExternalLink } from "lucide-react";

interface Props {
  publication: Publication;
  showAbstract?: boolean;
}

export default function PublicationCard({ publication, showAbstract = false }: Props) {
  const yearColors: Record<string, string> = {
    "2024": "bg-cyber-500/20 text-cyber-300 border-cyber-500/30",
    "2023": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "2022": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  };
  const yearColor = yearColors[publication.year] || "bg-slate-500/20 text-slate-300 border-slate-500/30";

  const typeColors: Record<string, string> = {
    conference: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    journal: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    workshop: "bg-rose-500/15 text-rose-300 border-rose-500/20",
    preprint: "bg-slate-500/15 text-slate-300 border-slate-500/20",
  };
  const typeColor = typeColors[publication.type] || typeColors.preprint;

  return (
    <div className="group rounded-xl border border-cyber-500/10 bg-slate-900/40 p-5 transition-all duration-200 hover:border-cyber-500/25 hover:bg-slate-900/60">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${yearColor}`}>
              {publication.year}
            </span>
            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium capitalize ${typeColor}`}>
              {publication.type}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-cyber-300 transition-colors">
            {publication.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            {publication.authors.join(", ")}
          </p>
          <p className="mt-0.5 text-xs text-slate-500 italic">
            {publication.venue}
          </p>
        </div>
      </div>

      {showAbstract && publication.abstract && (
        <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-3">
          {publication.abstract}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {publication.domain.map((d) => (
          <span
            key={d}
            className="rounded-full bg-cyber-500/8 px-2 py-0.5 text-[10px] font-medium text-cyber-400"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-cyber-500/5 pt-3">
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-cyber-500/10 px-2.5 py-1 text-[10px] font-medium text-cyber-300 hover:bg-cyber-500/20 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            DOI
          </a>
        )}
        <CopyButton bibtex={publication.bibtex} />
        {publication.pdfUrl && (
          <a
            href={publication.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <FileText className="h-3 w-3" />
            PDF
          </a>
        )}
      </div>
    </div>
  );
}

function CopyButton({ bibtex }: { bibtex: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(bibtex).catch(() => {});
      }}
      className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-700 transition-colors"
    >
      <Copy className="h-3 w-3" />
      BibTeX
    </button>
  );
}
