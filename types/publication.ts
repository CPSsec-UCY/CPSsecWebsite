export type PublicationType = "conference" | "journal" | "workshop" | "preprint" | "thesis";
export type ResearchDomain = "ICS/OT" | "Smart Grid" | "IoT" | "Cyber Range" | "Embedded Systems" | "Formal Methods" | "Network Security";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  authorSlugs: string[];
  affiliations: string[];
  venue: string;
  year: number;
  type: PublicationType;
  domain: ResearchDomain[];
  doi?: string;
  pdfUrl?: string;
  bibtex: string;
  abstract: string;
  tags: string[];
  citations?: number;
}
