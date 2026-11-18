// Comprobaciones de la web generada: node scripts/check.mjs (después de npm run build)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT, config } from "../src/lib.mjs";

const DIST = path.join(ROOT, "dist");
const errors = [], notes = [];
const fail = m => errors.push(m);
const files = [];
const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => (e.isDirectory() ? walk(path.join(d, e.name)) : files.push(path.join(d, e.name))));
walk(DIST);
const htmlFiles = files.filter(f => f.endsWith(".html"));
const rel = f => path.relative(DIST, f).split(path.sep).join("/");
const ids = new Map(htmlFiles.map(f => [rel(f), new Set([...fs.readFileSync(f, "utf8").matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))]));
const external = new Set();

for (const f of htmlFiles) {
  const r = rel(f), s = fs.readFileSync(f, "utf8");
  const one = (re, what) => { const n = (s.match(re) ?? []).length; if (n !== 1) fail(`${r}: ${what} aparece ${n} veces`); };
  one(/<title>[^<]{10,}<\/title>/g, "<title>"); one(/<h1[\s>]/g, "<h1>"); one(/<meta name="description" content="[^"]{50,}"/g, "meta description");
  if (!s.includes(`<html lang="${config.lang}">`)) fail(`${r}: falta lang`);
  if (r !== "404.html") { one(/<link rel="canonical" href="https:\/\/[^"]+"/g, "canonical"); one(/<meta property="og:image" content="https:\/\/[^"]+"/g, "og:image"); }
  for (const m of s.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) fail(`${r}: imagen sin alt`);
  for (const [, href] of s.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(mailto:|https?:)/.test(href)) { if (/^https?:/.test(href) && !href.startsWith(config.origin)) external.add(href); if (!href.startsWith(config.origin)) continue; }
    let u = href.startsWith(config.origin) ? href.slice(config.origin.length) : href;
    if (u.startsWith("#")) u = `${config.basePath}${r.replace(/index\.html$/, "")}${u}`;
    if (!u.startsWith(config.basePath)) { fail(`${r}: enlace fuera de la ruta base: ${href}`); continue; }
    const [p, hash] = u.slice(config.basePath.length).split("#");
    const target = p === "" || p.endsWith("/") ? `${p}index.html` : p;
    if (!fs.existsSync(path.join(DIST, target))) fail(`${r}: enlace roto ${href}`);
    else if (hash && target.endsWith(".html") && !ids.get(target)?.has(hash)) fail(`${r}: ancla inexistente ${href}`);
  }
  const pend = (s.match(/class="pendiente"/g) ?? []).length;
  if (pend) notes.push(`${r}: ${pend} dato(s) pendiente(s) de confirmar`);
}

// Las páginas que Google exige deben existir y enlazarse desde la página principal.
const home = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
for (const p of ["privacidad/", "condiciones/", "autocontent-studio/"]) {
  if (!fs.existsSync(path.join(DIST, p, "index.html"))) fail(`falta ${p}`);
  if (!home.includes(`href="${config.basePath}${p}"`)) fail(`la página principal no enlaza ${p}`);
}
const priv = fs.readFileSync(path.join(DIST, "privacidad/index.html"), "utf8");
for (const [needle, why] of [["YouTube API Services", "uso de YouTube API Services"], ["policies.google.com/privacy", "Política de privacidad de Google"], ["google.com/policies/privacy", "enlace exigido por YouTube"],
  ["youtube.com/t/terms", "Condiciones de YouTube"], ["security.google.com/settings/security/permissions", "página de permisos de Google"], ["youtube.upload", "permiso youtube.upload"],
  ["youtube.readonly", "permiso youtube.readonly"], ["uso limitado", "requisitos de uso limitado"], [config.contactEmail, "correo de contacto"]])
  if (!priv.includes(needle)) fail(`privacidad: falta ${why}`);

// Nada privado en lo que se publica ni en lo que se versiona.
const SECRET = [/GOCSPX-[\w-]{10,}/, /AIza[0-9A-Za-z_-]{30,}/, /ya29\.[\w-]{20,}/, /1\/\/0[\w-]{20,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /cloudinary:\/\/\w+:\w+@/, /"refresh_token"\s*:/, /client_secret"\s*:\s*"/];
let tracked = [];
try { tracked = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean).map(f => path.join(ROOT, f)); } catch { notes.push("git no disponible: solo se escanea dist/"); }
for (const f of [...files, ...tracked]) {
  if (/\.(woff2|png)$/.test(f)) continue;
  const s = fs.readFileSync(f, "utf8");
  for (const re of SECRET) if (re.test(s)) fail(`posible secreto en ${path.relative(ROOT, f)} (${re})`);
}
for (const f of tracked) if (/(^|\/)(\.env(\..*)?|.*\.db|.*\.sqlite|credentials\.json|youtube-token.*\.json)$/.test(path.relative(ROOT, f))) fail(`archivo sensible versionado: ${path.relative(ROOT, f)}`);

// Contraste WCAG de las combinaciones de color usadas para texto.
const lum = hex => { const c = hex.match(/\w\w/g).map(x => parseInt(x, 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
for (const [fg, bg, min, what] of [["#E8ECFA", "#050A1C", 7, "texto"], ["#9AA5CC", "#050A1C", 4.5, "texto secundario"], ["#9AA5CC", "#0B1736", 4.5, "texto secundario sobre nébula"],
  ["#9EE8FF", "#050A1C", 4.5, "enlaces"], ["#FFFFFF", "#2E5FE0", 4.5, "botón principal"], ["#FFCB6B", "#050A1C", 4.5, "marca de pendiente"], ["#E8ECFA", "#0B1736", 7, "texto sobre nébula"]]) {
  const r = ratio(fg, bg);
  if (r < min) fail(`contraste ${what} ${fg}/${bg} = ${r.toFixed(2)} (< ${min})`); else notes.push(`contraste ${what}: ${r.toFixed(2)}:1`);
}

const size = files.reduce((n, f) => n + fs.statSync(f).size, 0);
notes.push(`${htmlFiles.length} páginas, ${files.length} archivos, ${(size / 1024).toFixed(0)} KB en total`);
notes.push(`enlaces externos (${external.size}): ${[...external].sort().join(" ")}`);
for (const n of notes) console.log("·", n);
if (errors.length) { for (const e of errors) console.error("✗", e); process.exit(1); }
console.log("✓ todas las comprobaciones superadas");
