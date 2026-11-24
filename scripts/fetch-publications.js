const fs = require("fs");
const path = require("path");
const parseBibTeX = require("bibtex-parse");

const UCY_PUBLICATION_IDS = new Set([
  "lazarou2026accelerated",
  "lazarou2025stealthy",
  "christou2026acting",
  "paphitis2026explainability",
  "ieropoulos2026modular",
  "tsanaktsidis2026pqctls",
  "alsharif2026smlt",
  "feng2026hardfuzz",
  "paphitis2026unlearning",
  "ntougias2026capacity",
  "yang2026invariants",
  "almazarqi2025botpro",
  "soban2025adaptivefuzzing",
  "alsharif2025drift",
  "feng2025fuzzrducc",
  "almazarqi2025ddos",
  "photiades2025stratification",
  "marnerides2025pqclass",
  "tan2025apt",
  "alsharif2025energymarket",
  "almazarqi2024macroscopic",
]);

const DOMAINS = new Set([
  "ICS/OT",
  "Smart Grid",
  "IoT",
  "Cyber Range",
  "Embedded Systems",
  "Formal Methods",
  "Network Security",
]);

const TEAM_ROLES = new Set([
  "Lab Director",
  "Faculty",
  "Postdoctoral Researcher",
  "PhD Candidate",
  "MSc Student",
  "Research Assistant",
  "Research Engineer",
  "Software Engineer",
  "Research Associate",
  "Alumni",
]);

const PLATFORM_ICONS = new Set(["Network", "Shield", "Cpu", "Monitor"]);
const PUBLICATION_TYPES = new Set([
  "article",
  "inproceedings",
  "conference",
  "workshop",
  "phdthesis",
  "mastersthesis",
  "thesis",
  "misc",
]);

function fail(message) {
  throw new Error(message);
}

function assertHttpsUrl(value, label) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`${label} must be a valid URL`);
  }
  if (url.protocol !== "https:") fail(`${label} must use HTTPS`);
}

function assertDoi(value, label) {
  if (!/^10\.\d{4,9}\/\S+$/i.test(value)) fail(`${label} must be a valid DOI`);
}

function assertStringArray(value, label, allowEmpty = false) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) fail(`${label} must be a non-empty array`);
  if (!value.every((item) => typeof item === "string" && item.trim())) fail(`${label} must contain non-empty strings`);
}

function assertOrcid(value, label) {
  assertHttpsUrl(value, label);
  const match = value.match(/^https:\/\/orcid\.org\/(\d{4}-\d{4}-\d{4}-\d{3}[\dX])$/i);
  if (!match) fail(`${label} must be a canonical ORCID URL`);
  const digits = match[1].replace(/-/g, "").slice(0, 15);
  const check = match[1].replace(/-/g, "").slice(15);
  let total = 0;
  for (const digit of digits) total = (total + Number(digit)) * 2;
  const expected = String((12 - (total % 11)) % 11).replace(/^10$/, "X");
  if (check !== expected) fail(`${label} fails the ORCID checksum`);
}

function loadTeamRoster() {
  const teamDir = path.join(process.cwd(), "content/team");
  const files = fs.readdirSync(teamDir).filter((file) => file.endsWith(".json")).sort();
  const members = [];
  const slugs = new Set();
  const ids = new Set();
  const sortOrders = new Set();

  for (const file of files) {
    const member = JSON.parse(fs.readFileSync(path.join(teamDir, file), "utf-8"));
    const label = `content/team/${file}`;
    for (const field of ["id", "slug", "name", "role", "bio", "shortBio"]) {
      if (typeof member[field] !== "string" || !member[field].trim()) fail(`${label}: missing ${field}`);
    }
    if (member.id !== member.slug || file !== `${member.slug}.json`) fail(`${label}: id, slug, and filename must match`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(member.slug)) fail(`${label}: invalid slug`);
    if (slugs.has(member.slug)) fail(`${label}: duplicate slug`);
    if (ids.has(member.id)) fail(`${label}: duplicate id`);
    if (!Number.isInteger(member.sortOrder) || member.sortOrder < 1) fail(`${label}: sortOrder must be a positive integer`);
    if (sortOrders.has(member.sortOrder)) fail(`${label}: duplicate sortOrder`);
    if (!TEAM_ROLES.has(member.role)) fail(`${label}: unsupported role ${member.role}`);
    if (member.joined && (!/^\d{4}-\d{2}-\d{2}$/.test(member.joined) || Number.isNaN(Date.parse(member.joined)))) fail(`${label}: joined must be a valid YYYY-MM-DD date`);
    assertStringArray(member.researchInterests, `${label}.researchInterests`);
    if (member.avatarUrl) {
      if (member.avatarUrl.startsWith("/")) {
        if (!/^\/avatars\/[a-z0-9-]+\.(?:jpe?g|png|webp)$/.test(member.avatarUrl)) fail(`${label}: invalid local avatar path`);
        if (!fs.existsSync(path.join(process.cwd(), "public", member.avatarUrl))) fail(`${label}: missing avatar asset ${member.avatarUrl}`);
      } else {
        assertHttpsUrl(member.avatarUrl, `${label}.avatarUrl`);
      }
    }
    if (!member.socials || typeof member.socials !== "object" || Array.isArray(member.socials)) fail(`${label}: socials must be an object`);

    for (const [key, value] of Object.entries(member.socials)) {
      if (!["github", "linkedin", "googleScholar", "orcid", "website", "email"].includes(key)) {
        fail(`${label}: unsupported social key ${key}`);
      }
      if (typeof value !== "string" || !value.trim()) fail(`${label}: social values must be non-empty strings`);
      if (key === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) fail(`${label}: invalid email`);
      } else if (key === "github") {
        if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(value)) fail(`${label}: invalid GitHub handle`);
      } else if (key === "linkedin") {
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) fail(`${label}: invalid LinkedIn handle`);
      } else {
        assertHttpsUrl(value, `${label}.socials.${key}`);
      }
      if (key === "orcid") assertOrcid(value, `${label}.socials.orcid`);
    }

    slugs.add(member.slug);
    ids.add(member.id);
    sortOrders.add(member.sortOrder);
    members.push({
      name: member.name,
      slug: member.slug,
      nameParts: normalizeNameTokens(member.name),
    });
  }

  return members;
}

function normalizeNameTokens(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function tokenMatches(token, expected) {
  return token === expected || token === expected[0];
}

function matchAuthorSlugs(authors, roster) {
  const slugs = new Set();
  for (const author of authors) {
    const authorTokens = normalizeNameTokens(author);
    if (!authorTokens.length) continue;
    const candidates = [];

    for (const member of roster) {
      const parts = member.nameParts;
      const lastName = parts[parts.length - 1];
      const firstNames = parts.slice(0, -1);
      const fullNameMatch = parts.every((part) => authorTokens.some((token) => tokenMatches(token, part)));
      const surnameMatch = authorTokens.some((token) => tokenMatches(token, lastName));
      const initialMatches = firstNames.every((part) =>
        authorTokens.some((token) => token === part || token === part[0])
      );
      if (fullNameMatch || (surnameMatch && initialMatches)) candidates.push(member.slug);
    }

    if (candidates.length === 1) slugs.add(candidates[0]);
  }
  return Array.from(slugs);
}

function unescapeBibValue(value) {
  return String(value || "")
    .replace(/\\&/g, "&")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_")
    .replace(/\\\$/g, "$")
    .replace(/\\#/g, "#")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeType(type, fields) {
  if (!PUBLICATION_TYPES.has(type.toLowerCase())) fail(`Unsupported BibTeX entry type: ${type}`);
  const venue = `${fields.howpublished || fields.journal || fields.booktitle || fields.note || ""}`.toLowerCase();
  if (/arxiv|techrxiv|ssrn/.test(venue)) return "preprint";
  if (fields.peer_reviewed?.toLowerCase() === "false") return "preprint";
  switch (type.toLowerCase()) {
    case "article": return "journal";
    case "inproceedings":
    case "conference": return "conference";
    case "workshop": return "workshop";
    case "phdthesis":
    case "mastersthesis":
    case "thesis": return "thesis";
    default: return "preprint";
  }
}

function inferDomain(tags, abstract, venue) {
  const text = normalizeNameTokens(`${tags.join(" ")} ${abstract} ${venue}`).join(" ");
  const domains = [];
  const has = (pattern) => pattern.test(text);
  if (has(/\b(?:ics|ot|scada|plcs?|rtus?|modbus|opc|dnp3|industrial control)\b/)) domains.push("ICS/OT");
  if (has(/\b(?:smart grids?|power systems?|microgrids?|energy markets?|locational marginal|wams|pmus?|synchrophasors?)\b/)) domains.push("Smart Grid");
  if (has(/\b(?:iot|iiot|internet of things|mqtt|coap|edge computing|botnets?)\b/)) domains.push("IoT");
  if (has(/\b(?:cyber ranges?|testbeds?|hardware in the loop|hil)\b/)) domains.push("Cyber Range");
  if (has(/\b(?:embedded systems?|firmware|tees?|trustzone|risc v|microcontrollers?|side channels?)\b/)) domains.push("Embedded Systems");
  if (has(/\b(?:formal verification|model checking|theorem proving|smt)\b/)) domains.push("Formal Methods");
  if (has(/\b(?:network security|networks?|sdn|nfv|firewalls?|ids|ipsec|tls|ddos|cyber threat intelligence|fuzzing)\b/)) domains.push("Network Security");
  return domains.length > 0 ? domains : ["Network Security"];
}

function splitList(value) {
  return value ? value.split(",").map((item) => unescapeBibValue(item)).filter(Boolean) : [];
}

function serializeBibTeX(entry) {
  const lines = [`@${entry.type.toLowerCase()}{${entry.key},`];
  const fields = entry.fields.map(({ name, value }) => `  ${name} = {${value}}`);
  lines.push(fields.join(",\n"));
  lines.push("}");
  return lines.join("\n");
}

function buildPublication(entry, roster) {
  const citationKey = entry.key;
  const entryType = entry.type;
  const fields = Object.fromEntries(entry.fields.map(({ name, value }) => [name.toLowerCase(), value]));
  if (!citationKey || !fields.title) fail(`Publication is missing citationKey or title`);
  const authors = fields.author ? fields.author.split(/\s+and\s+/i).map((author) => unescapeBibValue(author)).filter(Boolean) : [];
  const year = Number(fields.year);
  if (!authors.length) fail(`${citationKey}: authors must be non-empty`);
  if (!Number.isInteger(year) || year < 1900 || year > 2100) fail(`${citationKey}: invalid year`);
  const venue = unescapeBibValue(fields.booktitle || fields.journal || fields.howpublished || fields.note);
  if (!venue) fail(`${citationKey}: missing venue`);
  const type = normalizeType(entryType, fields);
  const tags = splitList(fields.keywords).map((tag) => tag.toLowerCase());
  const abstract = unescapeBibValue(fields.abstract);
  const requestedDomains = splitList(fields.domains);
  for (const domain of requestedDomains) {
    if (!DOMAINS.has(domain)) fail(`${citationKey}: unsupported domain ${domain}`);
  }
  const domain = requestedDomains.length > 0 ? requestedDomains : inferDomain(tags, abstract, venue);
  const doi = unescapeBibValue(fields.doi).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "") || undefined;
  const arxivId = doi?.match(/^10\.48550\/arXiv\.(\d{4}\.\d{4,5})$/i)?.[1];
  const pdfUrl = unescapeBibValue(fields.pdf_url || fields.pdf) || (arxivId ? `https://arxiv.org/pdf/${arxivId}` : undefined);
  if (doi) assertDoi(doi, `${citationKey}.doi`);
  if (pdfUrl) assertHttpsUrl(pdfUrl, `${citationKey}.pdfUrl`);
  if (new Set(domain).size !== domain.length) fail(`${citationKey}: duplicate research domains`);

  return {
    id: citationKey,
    title: unescapeBibValue(fields.title),
    authors,
    authorSlugs: matchAuthorSlugs(authors, roster),
    affiliations: UCY_PUBLICATION_IDS.has(citationKey) ? ["University of Cyprus"] : [],
    venue,
    volume: unescapeBibValue(fields.volume) || undefined,
    issue: unescapeBibValue(fields.number || fields.issue) || undefined,
    pages: unescapeBibValue(fields.pages) || undefined,
    year,
    type,
    domain,
    doi,
    pdfUrl,
    bibtex: serializeBibTeX(entry),
    abstract,
    tags,
    peerReviewed: ["conference", "journal", "workshop"].includes(type),
  };
}

function validateBibliography(content) {
  const ids = Array.from(content.matchAll(/@\w+\{([^,]+),/g), (match) => match[1]);
  if (ids.length === 0) fail("No bibliography entries found");
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) fail(`Duplicate citation keys: ${duplicates.join(", ")}`);
  for (const id of UCY_PUBLICATION_IDS) {
    if (!ids.includes(id)) fail(`UCY allowlist references missing citation key ${id}`);
  }
}

function validateContentCollections() {
  const projects = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/projects.json"), "utf-8"));
  if (!Array.isArray(projects) || projects.length === 0) fail("content/projects.json must be a non-empty array");
  const projectNames = new Set();
  for (const project of projects) {
    for (const field of ["name", "description", "link"]) {
      if (typeof project[field] !== "string" || !project[field].trim()) fail(`Project is missing ${field}`);
    }
    if (projectNames.has(project.name)) fail(`Duplicate project name: ${project.name}`);
    assertStringArray(project.tags, `${project.name}.tags`);
    assertHttpsUrl(project.link, `${project.name}.link`);
    projectNames.add(project.name);
  }

  const platforms = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/platforms.json"), "utf-8"));
  if (!Array.isArray(platforms) || platforms.length === 0) fail("content/platforms.json must be a non-empty array");
  const platformNames = new Set();
  for (const platform of platforms) {
    for (const field of ["name", "description", "icon"]) {
      if (typeof platform[field] !== "string" || !platform[field].trim()) fail(`Platform is missing ${field}`);
    }
    if (platformNames.has(platform.name)) fail(`Duplicate platform name: ${platform.name}`);
    if (!PLATFORM_ICONS.has(platform.icon)) fail(`${platform.name}: unsupported icon ${platform.icon}`);
    assertStringArray(platform.tags, `${platform.name}.tags`);
    assertStringArray(platform.features, `${platform.name}.features`);
    if (platform.status && typeof platform.status !== "string") fail(`${platform.name}: status must be a string`);
    platformNames.add(platform.name);
  }
}

function validatePublishedData(publications) {
  const ids = new Set();
  for (const publication of publications) {
    if (ids.has(publication.id)) fail(`Duplicate publication id ${publication.id}`);
    ids.add(publication.id);
    if (publication.authorSlugs.length === 0) fail(`${publication.id}: no matching team author`);
    if (publication.domain.length === 0) fail(`${publication.id}: no research domains`);
    if (publication.domain.some((domain) => !DOMAINS.has(domain))) fail(`${publication.id}: unsupported research domain`);
    if (!["conference", "journal", "workshop", "preprint", "thesis"].includes(publication.type)) fail(`${publication.id}: unsupported publication type`);
    if (publication.affiliations.length === 0) continue;
    if (publication.peerReviewed && !["conference", "journal", "workshop"].includes(publication.type)) {
      fail(`${publication.id}: invalid peer-reviewed type ${publication.type}`);
    }
  }
}

function main() {
  console.log("=== CPSSec Publication Fetcher ===\n");
  const bibPath = path.join(process.cwd(), "content", "publications.bib");
  if (!fs.existsSync(bibPath)) fail("Missing content/publications.bib");
  const content = fs.readFileSync(bibPath, "utf-8");
  validateBibliography(content);
  const entries = parseBibTeX.parse(content).filter((entry) => entry.itemtype === "entry");
  const declaredIds = Array.from(content.matchAll(/@\w+\{([^,]+),/g), (match) => match[1]);
  if (entries.length === 0) fail("No bibliography entries parsed");
  if (entries.length !== declaredIds.length) fail(`Parsed ${entries.length} entries but found ${declaredIds.length} citation keys`);
  const roster = loadTeamRoster();
  validateContentCollections();
  const publications = entries.map((entry) => buildPublication(entry, roster));
  const visible = publications.filter((publication) => publication.affiliations.length > 0);
  if (visible.length === 0) fail("No approved UCY publications remain");
  validatePublishedData(visible);

  const outDir = path.join(process.cwd(), "public", "data");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "publications.json");
  fs.writeFileSync(outPath, JSON.stringify(visible, null, 2), "utf-8");
  console.log(`Validated ${entries.length} entries; wrote ${visible.length} approved publications to ${outPath}`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Publication generation failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  UCY_PUBLICATION_IDS,
  buildPublication,
  inferDomain,
  loadTeamRoster,
  matchAuthorSlugs,
  normalizeType,
  validateBibliography,
  validateContentCollections,
  validatePublishedData,
};
