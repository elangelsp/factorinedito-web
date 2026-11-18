import { config, html, esc, url, absUrl, contactLink, ext } from "./lib.mjs";
import { logo } from "./assets/marks.mjs";

const NAV = [
  ["", "Inicio"],
  ["sobre/", "Sobre el canal"],
  ["autocontent-studio/", "AutoContent Studio"],
  ["privacidad/", "Privacidad"],
];

export function channelLinks(cls = "") {
  const { youtube, tiktok } = config.channels;
  const item = (href, name) => href
    ? html`<a class="channel ${cls}" href="${esc(href)}" rel="noopener" target="_blank">${name}<span class="sr-only"> (se abre en una pestaña nueva)</span></a>`
    : html`<span class="channel ${cls} is-pending" title="El enlace se añadirá cuando el canal esté publicado">${name} <small>enlace en camino</small></span>`;
  return html`${item(youtube, "Ver en YouTube")}${item(tiktok, "Ver en TikTok")}`;
}

/**
 * Full page. `path` is relative to the base ("" = home, "sobre/"); `main` is the page body.
 */
export function page({ path, title, description, main, bodyClass = "", noindex = false }) {
  const canonical = absUrl(path);
  const fullTitle = path === "" ? `${config.siteName} — ${config.tagline.replace(/\.$/, "")}` : `${title} · ${config.siteName}`;
  const desc = description ?? config.description;
  return html`<!doctype html>
<html lang="${config.lang}">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add("js")</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : html`<link rel="canonical" href="${canonical}">`}
${config.googleSiteVerification ? html`<meta name="google-site-verification" content="${esc(config.googleSiteVerification)}">` : ""}
<meta name="theme-color" content="#050A1C">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${esc(config.siteName)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${absUrl("og.png")}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logotipo de Factor Inédito sobre un mapa de estrellas">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${url("favicon.svg")}" type="image/svg+xml">
<link rel="icon" href="${url("favicon-32.png")}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${url("apple-touch-icon.png")}">
<link rel="preload" href="${url("fonts/bricolage.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${url("styles.css")}">
</head>
<body class="${bodyClass}">
<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="site-header">
  <a class="brand" href="${url("")}" aria-label="Factor Inédito, inicio">${logo()}</a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu">Menú</button>
  <nav id="menu" class="site-nav" aria-label="Principal">
    <ul>${NAV.map(([p, label]) => html`<li><a href="${url(p)}"${p === path ? ' aria-current="page"' : ""}>${label}</a></li>`)}</ul>
  </nav>
</header>
<main id="contenido">
${main}
</main>
<footer class="site-footer">
  <div class="footer-brand">${logo("logo-small")}<p>${esc(config.tagline)}</p></div>
  <nav aria-label="Pie de página">
    <ul>
      <li><a href="${url("sobre/")}">Sobre el canal</a></li>
      <li><a href="${url("autocontent-studio/")}">AutoContent Studio</a></li>
      <li><a href="${url("privacidad/")}">Política de privacidad</a></li>
      <li><a href="${url("condiciones/")}">Condiciones de uso</a></li>
      <li><a href="${url("legal/")}">Aviso legal, cookies y contacto</a></li>
    </ul>
  </nav>
  <div class="footer-contact">
    <p>Contacto: ${contactLink()}</p>
    <p class="footnote">Esta web no usa cookies, ni analítica, ni contenido incrustado de terceros. Se publica con ${ext("https://pages.github.com/", "GitHub Pages")}.</p>
  </div>
</footer>
<script src="${url("site.js")}" defer></script>
</body>
</html>
`;
}
