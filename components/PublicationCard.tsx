"use client";

import { useEffect, useId, useState } from "react";
import type { Publication } from "@/types/publication";
import { FileText, Copy, ExternalLink } from "lucide-react";

interface Props {
  publication: Publication;
  showAbstract?: boolean;
}

const yearBadge: Record<string, string> = {
  "2026": "badge-year bg-amber-500/15 text-amber-300 border-amber-500/25",
  "2025": "badge-year bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  "2024": "badge-year bg-cyber-500/15 text-cyber-300 border-cyber-500/25",
};
const fallbackYear = "badge-year bg-slate-600/30 text-slate-200 border-slate-500/30";

const typeBadge: Record<string, string> = {
  conference: "badge-type bg-amber-500/10 text-amber-300 border-amber-500/20",
  journal: "badge-type bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  workshop: "badge-type bg-rose-500/10 text-rose-300 border-rose-500/20",
  preprint: "badge-type bg-slate-500/15 text-slate-200 border-slate-500/20",
};

export default function PublicationCard({ publication, showAbstract = false }: Props) {
  return (
    <div className="card-hover group p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={yearBadge[publication.year] || fallbackYear}>
              {publication.year}
            </span>
            <span className={typeBadge[publication.type] || typeBadge.preprint}>
              {publication.type}
            </span>
          </div>
          <h3 className="break-words text-sm font-semibold leading-snug text-white transition-colors group-hover:text-cyber-300">
            {publication.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            {publication.authors.join(", ")}
          </p>
          <p className="mt-0.5 text-xs italic text-slate-400">
            {publication.venue}
            {publication.volume ? `, ${publication.volume}${publication.issue ? `(${publication.issue})` : ""}` : ""}
            {publication.pages ? `: ${publication.pages}` : ""}
          </p>
        </div>
      </div>

      {showAbstract && publication.abstract && (
        <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
          {publication.abstract}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {publication.domain.map((d) => (
          <span key={d} className="tag-cyan">
            {d}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-700/50 pt-3">
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
            className="inline-flex items-center gap-1 rounded-md bg-slate-700/50 px-2.5 py-1 text-[10px] font-medium text-slate-200 hover:bg-slate-700 transition-colors"
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
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const statusId = useId();

  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  function fallbackCopy(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Clipboard unavailable");
  }

  async function copyBibtex() {
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(bibtex);
        copied = true;
      } catch {
        copied = false;
      }
    }
    if (!copied) {
      try {
        fallbackCopy(bibtex);
        copied = true;
      } catch {
        copied = false;
      }
    }
    setStatus(copied ? "copied" : "failed");
  }

  return (
    <>
      <button
        type="button"
        onClick={copyBibtex}
        aria-describedby={status !== "idle" ? statusId : undefined}
        className="inline-flex items-center gap-1 rounded-md bg-slate-700/50 px-2.5 py-1 text-[10px] font-medium text-slate-200 hover:bg-slate-700 transition-colors"
      >
        <Copy className="h-3 w-3" />
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "BibTeX"}
      </button>
      <span id={statusId} aria-live="polite" className="sr-only">
        {status === "copied" ? "BibTeX copied" : status === "failed" ? "BibTeX could not be copied" : ""}
      </span>
    </>
  );
}
