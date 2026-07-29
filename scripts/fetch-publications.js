/**
 * fetch-publications.js
 *
 * Build-time script that ingests publications from:
 *   1. content/publications.bib (primary source)
 *   2. Optionally: Google Scholar / ORCID APIs using team member IDs
 *
 * Output: public/data/publications.json — consumed by the Next.js build.
 *
 * The authorSlugs array is auto-populated by matching author name substrings
 * against team member names from content/team/*.json.
 *
 * Usage: node scripts/fetch-publications.js
 */

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------
// 1. Load team roster for author matching
// ---------------------------------------------------------------
function loadTeamRoster() {
  const teamDir = path.join(process.cwd(), "content/team");
  const files = fs.readdirSync(teamDir).filter((f) => f.endsWith(".json"));
  const roster = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(teamDir, f), "utf-8");
    const member = JSON.parse(raw);
    roster.push({
      name: member.name,
      slug: member.slug,
      nameParts: member.name
        .toLowerCase()
        .split(/\s+/)
        .filter((p) => p.length > 1),
    });
  }
  return roster;
}

// ---------------------------------------------------------------
// 2. Match an author string against the roster to find slugs
// ---------------------------------------------------------------
function normalizeNameTokens(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function matchAuthorSlugs(authors, roster) {
  const slugs = [];
  for (const author of authors) {
    const authorTokens = normalizeNameTokens(author);
    const authorLower = authorTokens.join(" ");

    for (const member of roster) {
      const memberTokens = member.nameParts;
      if (!memberTokens.length) continue;

      const lastName = memberTokens[memberTokens.length - 1];
      const hasLastName = authorTokens.some((token) => token === lastName || token.startsWith(lastName.slice(0, 3)));
      const firstNameParts = memberTokens.slice(0, -1);
      const hasFirstNameMatch = firstNameParts.some((part) =>
        authorTokens.some((token) => token === part || token.startsWith(part.slice(0, 2)))
      );

      const fullNameMatch = memberTokens.every((part) =>
        authorTokens.some((token) => token === part || token.startsWith(part.slice(0, 3)))
      );

      const initialsMatch =
        member.name
          .split(/\s+/)
          .filter(Boolean)
          .map((part) => part[0])
          .join("") &&
        authorLower.includes(
          member.name
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
        );

      const match = fullNameMatch || (hasLastName && (hasFirstNameMatch || initialsMatch));
      if (match) {
        if (!slugs.includes(member.slug)) {
          slugs.push(member.slug);
        }
        break;
      }
    }
  }
  return slugs;
}

// ---------------------------------------------------------------
// 3. Simple BibTeX parser (no external dependency needed)
// ---------------------------------------------------------------
function parseBibTeX(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const entries = [];
  const entryRegex = /@(\w+)\{([^,]+),([\s\S]*?)\n\}/g;
  let match;

  while ((match = entryRegex.exec(content)) !== null) {
    const [, type, id, body] = match;
    const fields = {};
    const fieldRegex = /\s*(\w+)\s*=\s*\{(.*?)\},?\s*/gs;
    let fm;
    while ((fm = fieldRegex.exec(body)) !== null) {
      fields[fm[1].toLowerCase()] = fm[2].trim();
    }

    const authors = fields.author
      ? fields.author.split(/\s+and\s+/i).map((a) => a.trim())
      : [];
    const year = fields.year ? parseInt(fields.year, 10) : new Date().getFullYear();
    const tags = fields.keywords
      ? fields.keywords.split(",").map((k) => k.trim().toLowerCase())
      : [];

    // Infer domain from tags / venue
    const domain = inferDomain(tags, fields.abstract || "", fields.booktitle || fields.journal || "");

    entries.push({
      id,
      title: fields.title || "Untitled",
      authors,
      authorSlugs: [],
      venue: fields.booktitle || fields.journal || fields.note || "",
      year,
      type: normalizeType(type),
      domain,
      doi: fields.doi || undefined,
      pdfUrl: undefined,
      bibtex: `@${type.toLowerCase()}{${id},\n${Object.entries(fields)
        .map(([k, v]) => `  ${k} = {${v}}`)
        .join(",\n")}\n}`,
      abstract: fields.abstract || "",
      tags,
    });
  }
  return entries;
}

function normalizeType(type) {
  const t = type.toLowerCase();
  if (t === "article") return "journal";
  if (t === "inproceedings" || t === "conference") return "conference";
  if (t === "workshop") return "workshop";
  if (t === "phdthesis" || t === "mastersthesis") return "thesis";
  return "preprint";
}

function inferDomain(tags, abstract, venue) {
  const text = [...tags, abstract, venue].join(" ").toLowerCase();
  const domains = [];
  if (text.match(/ics|industrial control|scada|plc|rtu|modbus|opc|dnp3|ot\s/)) domains.push("ICS/OT");
  if (text.match(/smart grid|power grid|microgrid|wams|pmu|iec 61850|synchrophasor/)) domains.push("Smart Grid");
  if (text.match(/iot|iiot|internet of things|mqtt|coap|edge/)) domains.push("IoT");
  if (text.match(/cyber range|testbed|simulation|honeypot|hardware-in-the-loop|hil/)) domains.push("Cyber Range");
  if (text.match(/embedded|firmware|tee|trustzone|risc-v|side-channel/)) domains.push("Embedded Systems");
  if (text.match(/formal|verification|model checking|theorem proving|smt/)) domains.push("Formal Methods");
  if (text.match(/network|sdn|nfv|firewall|ids|ipsec|tls/)) domains.push("Network Security");
  return domains.length > 0 ? domains : ["Network Security"];
}

// ---------------------------------------------------------------
// 4. Fetch from Google Scholar (optional, placeholder)
// ---------------------------------------------------------------
async function fetchFromScholar(scholarId) {
  // In production, use serpAPI or scholarly library.
  // For now we return null; the BibTeX file is the primary source.
  console.log(`  [SKIP] Google Scholar fetch for ${scholarId} — not configured`);
  return [];
}

// ---------------------------------------------------------------
// 5. Fetch from ORCID (optional, placeholder)
// ---------------------------------------------------------------
async function fetchFromOrcid(orcidId) {
  // ORCID API: https://pub.orcid.org/v3.0/{orcidId}/works
  // For now, return null.
  console.log(`  [SKIP] ORCID fetch for ${orcidId} — not configured`);
  return [];
}

// ---------------------------------------------------------------
// 6. Main orchestrator
// ---------------------------------------------------------------
async function main() {
  console.log("=== CPSSec Publication Fetcher ===\n");

  // Load existing data from publications.bib
  const bibPath = path.join(process.cwd(), "content", "publications.bib");
  let publications = [];
  if (fs.existsSync(bibPath)) {
    console.log("[1/3] Parsing publications.bib...");
    publications = parseBibTeX(bibPath);
    console.log(`       Found ${publications.length} entries.\n`);
  } else {
    console.log("[1/3] No publications.bib found. Skipping.\n");
  }

  // Load team roster and auto-match authorSlugs
  console.log("[2/3] Matching authors to team roster...");
  const roster = loadTeamRoster();
  let matchedCount = 0;
  for (const pub of publications) {
    const slugs = matchAuthorSlugs(pub.authors, roster);
    if (slugs.length > 0) {
      pub.authorSlugs = slugs;
      matchedCount++;
    }
  }
  console.log(`       Matched ${matchedCount}/${publications.length} publications.\n`);

  // Write output
  const outDir = path.join(process.cwd(), "public", "data");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, "publications.json");
  fs.writeFileSync(outPath, JSON.stringify(publications, null, 2), "utf-8");
  console.log(`[3/3] Written ${publications.length} publications to public/data/publications.json\n`);
  console.log("=== Done ===");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
