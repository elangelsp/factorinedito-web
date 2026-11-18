// Generador estático: node src/build.mjs → dist/
import fs from "node:fs";
import path from "node:path";
import { ROOT, config, absUrl } from "./lib.mjs";
import { favicon } from "./assets/marks.mjs";
import home from "./pages/home.mjs";
import sobre from "./pages/sobre.mjs";
import autocontent from "./pages/autocontent.mjs";
import privacidad from "./pages/privacidad.mjs";
import condiciones from "./pages/condiciones.mjs";
import legal from "./pages/legal.mjs";
import notfound from "./pages/notfound.mjs";

const DIST = path.join(ROOT, "dist");
const PAGES = [["", home], ["sobre/", sobre], ["autocontent-studio/", autocontent], ["privacidad/", privacidad], ["condiciones/", condiciones], ["legal/", legal]];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, "fonts"), { recursive: true });

const font = (pkg, file, out) => fs.copyFileSync(path.join(ROOT, "node_modules", "@fontsource-variable", pkg, "files", file), path.join(DIST, "fonts", out));
font("bricolage-grotesque", "bricolage-grotesque-latin-standard-normal.woff2", "bricolage.woff2");
font("newsreader", "newsreader-latin-standard-normal.woff2", "newsreader.woff2");

const minifyCss = css => css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};,>])\s*/g, "$1").replace(/;}/g, "}").trim();
fs.writeFileSync(path.join(DIST, "styles.css"), minifyCss(fs.readFileSync(path.join(ROOT, "src", "styles.css"), "utf8")));
fs.copyFileSync(path.join(ROOT, "src", "site.js"), path.join(DIST, "site.js"));
fs.writeFileSync(path.join(DIST, "favicon.svg"), favicon);
for (const dir of ["static"]) {
  const from = path.join(ROOT, "src", dir);
  if (fs.existsSync(from)) fs.cpSync(from, DIST, { recursive: true });
}

const write = (rel, content) => { const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, content); };
for (const [p, render] of PAGES) write(p ? `${p}index.html` : "index.html", render());
write("404.html", notfound());

const today = config.lastLegalUpdate;
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.map(([p]) => `  <url><loc>${absUrl(p)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
// robots.txt solo cuenta en la raíz del host; en un sitio de proyecto (/factorinedito-web/) no se genera.
if (config.basePath === "/") write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${absUrl("sitemap.xml")}\n`);

const files = [];
const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => (e.isDirectory() ? walk(path.join(d, e.name)) : files.push(path.join(d, e.name))));
walk(DIST);
const kb = files.reduce((n, f) => n + fs.statSync(f).size, 0) / 1024;
console.log(`dist/: ${files.length} archivos, ${kb.toFixed(0)} KB`);
