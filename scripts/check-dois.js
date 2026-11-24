const fs = require("fs");
const path = require("path");
const parseBibTeX = require("bibtex-parse");

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function fetchWork(doi) {
  const url = `https://api.openalex.org/works/https://doi.org/${encodeURIComponent(doi)}?mailto=kios%40ucy.ac.cy`;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "CPSSecWebsite/1.0 (mailto:kios@ucy.ac.cy)" },
        signal: AbortSignal.timeout(15000),
      });
      if (response.ok) return response.json();
      lastError = new Error(`HTTP ${response.status}`);
      if (response.status !== 429 && response.status < 500) break;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 750));
  }
  throw lastError;
}

async function main() {
  const bibPath = path.join(process.cwd(), "content/publications.bib");
  const entries = parseBibTeX.parse(fs.readFileSync(bibPath, "utf-8"))
    .filter((entry) => entry.itemtype === "entry");
  const failures = [];
  let checked = 0;

  for (const entry of entries) {
    const fields = Object.fromEntries(entry.fields.map(({ name, value }) => [name.toLowerCase(), value]));
    if (!fields.doi) continue;
    try {
      const work = await fetchWork(fields.doi);
      const expectedTitle = normalize(fields.title);
      const registeredTitle = normalize(work.display_name);
      const titleMatches = expectedTitle === registeredTitle
        || expectedTitle.includes(registeredTitle)
        || registeredTitle.includes(expectedTitle);
      const yearMatches = Number(fields.year) === work.publication_year;
      if (!titleMatches || !yearMatches) {
        failures.push(`${entry.key}: metadata mismatch (expected "${fields.title}" ${fields.year}; received "${work.display_name}" ${work.publication_year})`);
      }
      checked += 1;
    } catch (error) {
      failures.push(`${entry.key}: DOI lookup failed for ${fields.doi} (${error.message})`);
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  if (failures.length > 0) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
  console.log(`Verified title and year metadata for ${checked} DOIs.`);
}

main().catch((error) => {
  console.error(`DOI verification failed: ${error.message}`);
  process.exit(1);
});
