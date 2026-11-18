import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const config = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));

/** Escape text for HTML. */
export const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
/** Template tag: arrays are joined, null/false/undefined render as nothing. Values are NOT escaped (use esc()). */
export const html = (strings, ...vals) => strings.reduce((out, s, i) => out + s + (i < vals.length ? render(vals[i]) : ""), "");
const render = v => (v == null || v === false ? "" : Array.isArray(v) ? v.map(render).join("") : String(v));

/** Internal URL under the GitHub Pages base path. */
export const url = (p = "") => config.basePath + p.replace(/^\//, "");
export const absUrl = (p = "") => config.origin + url(p);

/** Visible marker for data the owner still has to confirm. */
export const pending = label => html`<mark class="pendiente" title="Dato pendiente de confirmar por el titular">[Pendiente: ${esc(label)}]</mark>`;
export const ownerName = () => (config.owner.name ? esc(config.owner.name) : pending("nombre y apellidos del titular"));
export const contactLink = () => html`<a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a>`;

export const fmtDate = iso => new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** External link that opens in a new tab and says so to assistive tech. */
export const ext = (href, text) => html`<a href="${esc(href)}" rel="noopener" target="_blank">${text}<span class="sr-only"> (se abre en una pestaña nueva)</span></a>`;
