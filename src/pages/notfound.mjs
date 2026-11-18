import { html, url } from "../lib.mjs";
import { page } from "../layout.mjs";

export default function notfound() {
  const main = html`
<section class="notfound">
  <p class="nf-code" aria-hidden="true">404</p>
  <h1>Esta página no existe</h1>
  <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
  <p><a class="channel cta" href="${url("")}">Volver al inicio</a></p>
</section>`;
  return page({ path: "404.html", title: "Página no encontrada", description: "La página que buscas no existe en la web de Factor Inédito. Vuelve al inicio para seguir explorando.", main, noindex: true });
}
