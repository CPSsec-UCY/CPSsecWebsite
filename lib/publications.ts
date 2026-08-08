import fs from "fs";
import path from "path";
import type { Publication, ResearchDomain } from "@/types/publication";

const pubPath = path.join(process.cwd(), "public/data/publications.json");

export function getAllPublications(): Publication[] {
  const raw = fs.readFileSync(pubPath, "utf-8");
  const publications: Publication[] = JSON.parse(raw);
  return publications.filter((p) => p.affiliations?.includes("University of Cyprus"));
}

export function getPublicationsBySlug(slug: string): Publication[] {
  return getAllPublications().filter((p) => p.authorSlugs.includes(slug));
}

export function getPublicationById(id: string): Publication | undefined {
  return getAllPublications().find((p) => p.id === id);
}

export function getAllYears(): number[] {
  const years = new Set<number>();
  for (const p of getAllPublications()) {
    years.add(p.year);
  }
  return Array.from(years).sort((a, b) => b - a);
}

export function getAllDomains(): ResearchDomain[] {
  const domains = new Set<ResearchDomain>();
  for (const p of getAllPublications()) {
    for (const d of p.domain) {
      domains.add(d);
    }
  }
  return Array.from(domains).sort();
}
