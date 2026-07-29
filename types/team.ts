export interface SocialLinks {
  github?: string;
  linkedin?: string;
  googleScholar?: string;
  orcid?: string;
  website?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: "Lab Director" | "Faculty" | "Postdoctoral Researcher" | "PhD Candidate" | "MSc Student" | "Research Assistant" | "Software Engineer" | "Research Associate" | "Alumni";
  bio: string;
  shortBio: string;
  avatarUrl?: string;
  socials: SocialLinks;
  researchInterests: string[];
  scholarId?: string;
  orcidId?: string;
  joined: string;
  sortOrder: number;
}
