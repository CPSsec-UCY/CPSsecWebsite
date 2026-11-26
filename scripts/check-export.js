const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const htmlFiles = [];
const cssFiles = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(file);
    else if (entry.name.endsWith(".html")) htmlFiles.push(file);
    else if (entry.name.endsWith(".css")) cssFiles.push(file);
  }
}

if (!fs.existsSync(root)) {
  console.error("Missing out directory. Run npm run build first.");
  process.exit(1);
}

collect(root);
const errors = [];
const references = new Set();
const teamDir = path.join(process.cwd(), "content/team");
const expectedProfiles = new Map(
  fs.readdirSync(teamDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const member = JSON.parse(fs.readFileSync(path.join(teamDir, file), "utf-8"));
      return [member.slug, member.name];
    }),
);

function addReference(reference, file) {
  if (!reference.startsWith("/") || reference.startsWith("//")) return;
  if (basePath && !reference.startsWith(`${basePath}/`) && reference !== basePath) {
    errors.push(`${path.relative(root, file)}: ${reference} is outside ${basePath}`);
    return;
  }
  references.add(reference);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf-8");
  if (html.includes('id="__next_error__"') || html.includes("NEXT_HTTP_ERROR_FALLBACK;404")) {
    errors.push(`${path.relative(root, file)}: exported a Next error page`);
  }
  const profileMatch = path.relative(root, file).match(/^team\/([a-z0-9-]+)\.html$/);
  if (profileMatch) {
    const expectedName = expectedProfiles.get(profileMatch[1]);
    if (!expectedName || !html.includes(expectedName)) {
      errors.push(`${path.relative(root, file)}: missing expected profile content`);
    }
  }
  for (const tag of html.matchAll(/<[^>]+>/g)) {
    const rel = tag[0].match(/\brel="([^"]+)"/)?.[1] || "";
    if (/^<link\b/i.test(tag[0]) && /\b(?:preconnect|dns-prefetch)\b/.test(rel)) continue;
    for (const attribute of tag[0].matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      addReference(attribute[1], file);
    }
  }
}

for (const file of cssFiles) {
  const css = fs.readFileSync(file, "utf-8");
  for (const match of css.matchAll(/url\((["']?)([^"')]+)\1\)/g)) {
    addReference(match[2], file);
  }
}

for (const reference of references) {
  const route = basePath && reference.startsWith(basePath) ? reference.slice(basePath.length) || "/" : reference;
  const withoutQuery = route.split(/[?#]/)[0];
  const target = path.join(root, withoutQuery);
  const candidates = [target, `${target}.html`, path.join(target, "index.html")];
  if (!candidates.some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())) {
    errors.push(`Missing export target: ${reference}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${htmlFiles.length} HTML files, ${cssFiles.length} CSS files, and ${references.size} internal references.`);
