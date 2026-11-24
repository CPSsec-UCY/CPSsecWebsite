const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

if (!fs.existsSync(root)) {
  console.error("Missing out directory. Run npm run build first.");
  process.exit(1);
}

function sendFile(response, file, status = 200) {
  response.writeHead(status, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(response);
}

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  if (basePath) {
    if (pathname === basePath) pathname = "/";
    else if (pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
    else {
      const notFound = path.join(root, "404.html");
      if (fs.existsSync(notFound)) sendFile(response, notFound, 404);
      else response.writeHead(404).end("Not found");
      return;
    }
  }

  const cleanPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  let file = path.resolve(root, `.${cleanPath}`);
  const relative = path.relative(root, file);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const html = path.join(file, "index.html");
    file = fs.existsSync(html) ? html : `${file}.html`;
  }

  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    const notFound = path.join(root, "404.html");
    if (fs.existsSync(notFound)) sendFile(response, notFound, 404);
    else response.writeHead(404).end("Not found");
    return;
  }

  sendFile(response, file);
});

server.listen(port, () => console.log(`Static site available at http://localhost:${port}${basePath}/`));
