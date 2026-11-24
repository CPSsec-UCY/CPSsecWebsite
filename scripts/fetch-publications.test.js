const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const parseBibTeX = require("bibtex-parse");
const {
  buildPublication,
  inferDomain,
  loadTeamRoster,
  matchAuthorSlugs,
  normalizeType,
  validateBibliography,
  validateContentCollections,
} = require("./fetch-publications");

function fields(values) {
  return Object.entries(values).map(([name, value]) => ({ name, value }));
}

function entry(key, type, values) {
  return { itemtype: "entry", key, type, fields: fields(values) };
}

const roster = [
  { name: "John Smith", slug: "john-smith", nameParts: ["john", "smith"] },
  { name: "John Smithers", slug: "john-smithers", nameParts: ["john", "smithers"] },
  { name: "José Álvarez", slug: "jose-alvarez", nameParts: ["jose", "alvarez"] },
];

test("domain inference uses token boundaries", () => {
  assert.deepEqual(inferDomain([], "while not knowledge", ""), ["Network Security"]);
  assert.deepEqual(inferDomain(["power systems", "energy market"], "", ""), ["Smart Grid"]);
  assert.deepEqual(inferDomain(["IoT botnet"], "", ""), ["IoT"]);
});

test("arXiv records are preprints regardless of BibTeX entry type", () => {
  assert.equal(normalizeType("article", { journal: "arXiv preprint arXiv:2509.04967" }), "preprint");
  assert.equal(normalizeType("article", { journal: "Journal", peer_reviewed: "false" }), "preprint");
  assert.equal(normalizeType("article", { journal: "Journal" }), "journal");
});

test("author matching supports initials and rejects surname prefixes", () => {
  assert.deepEqual(matchAuthorSlugs(["J. Smith"], roster), ["john-smith"]);
  assert.deepEqual(matchAuthorSlugs(["John Smithers"], roster), ["john-smithers"]);
  assert.deepEqual(matchAuthorSlugs(["Jose Alvarez"], roster), ["jose-alvarez"]);
});

test("BibTeX nested braces and quoted values survive publication building", () => {
  const parsed = parseBibTeX.parse('@article{test2026,\n  title = {A {Nested} Title},\n  author = "John Smith",\n  year = {2026},\n  journal = {Test Journal},\n  volume = {12},\n  number = {3},\n  pages = {45--67},\n  doi = {10.1234/test}\n}')[0];
  const publication = buildPublication(parsed, roster);
  assert.equal(publication.title, "A {Nested} Title");
  assert.deepEqual(publication.authors, ["John Smith"]);
  assert.deepEqual(publication.authorSlugs, ["john-smith"]);
  assert.equal(publication.volume, "12");
  assert.equal(publication.issue, "3");
  assert.equal(publication.pages, "45--67");
  assert.equal(publication.peerReviewed, true);
});

test("publication validation rejects missing years and invalid DOIs", () => {
  assert.throws(() => buildPublication(entry("bad-year", "article", {
    title: "Bad Year",
    author: "John Smith",
    journal: "Journal",
  }), roster), /invalid year/);
  assert.throws(() => buildPublication(entry("bad-doi", "article", {
    title: "Bad DOI",
    author: "John Smith",
    year: "2026",
    journal: "Journal",
    doi: "not-a-doi",
  }), roster), /valid DOI/);
});

test("bibliography validation rejects duplicates and missing allowlist entries", () => {
  assert.throws(() => validateBibliography("@article{dup,\n}\n@article{dup,\n}"), /Duplicate citation keys/);
  assert.throws(() => validateBibliography("@article{other,\n}"), /missing citation key/);
});

test("current content and bibliography validate", () => {
  assert.equal(loadTeamRoster().length, 13);
  validateContentCollections();
  const content = fs.readFileSync(path.join(process.cwd(), "content/publications.bib"), "utf-8");
  const entries = parseBibTeX.parse(content).filter((item) => item.itemtype === "entry");
  const publications = entries.map((item) => buildPublication(item, loadTeamRoster()));
  const visible = publications.filter((publication) => publication.affiliations.length > 0);
  assert.equal(visible.length, 21);
  assert.equal(visible.filter((publication) => publication.peerReviewed).length, 20);
  assert.ok(visible.every((publication) => publication.authorSlugs.length > 0));
  assert.ok(!visible.some((publication) => publication.id === "anthi2024rf"));
});
