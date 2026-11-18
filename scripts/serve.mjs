// Vista previa local con la misma ruta base que producción: node scripts/serve.mjs [puerto]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { ROOT, config } from "../src/lib.mjs";
const DIST = path.join(ROOT, "dist");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
const port = Number(process.argv[2] ?? 8080);
http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!u.startsWith(config.basePath)) { res.writeHead(302, { Location: config.basePath }); return res.end(); }
  let f = path.join(DIST, u.slice(config.basePath.length));
  if (!f.startsWith(DIST)) { res.writeHead(400); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
    if (!u.endsWith("/")) { res.writeHead(301, { Location: `${u}/` }); return res.end(); }
    f = path.join(f, "index.html");
  }
  if (!fs.existsSync(f)) { res.writeHead(404, { "Content-Type": TYPES[".html"] }); return res.end(fs.readFileSync(path.join(DIST, "404.html"))); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] ?? "application/octet-stream" });
  res.end(fs.readFileSync(f));
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}${config.basePath}`));
