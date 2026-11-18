import { config, html, esc, url, ext, ownerName, contactLink, pending, fmtDate } from "../lib.mjs";
import { page } from "../layout.mjs";

export default function legal() {
  const o = config.owner;
  const main = html`
<article class="prose-page legal">
  <header class="page-head">
    <h1>Aviso legal, cookies y contacto</h1>
    <p class="meta">Última actualización: <time datetime="${config.lastLegalUpdate}">${fmtDate(config.lastLegalUpdate)}</time></p>
  </header>
  <div class="prose">
    <h2 id="contacto">Contacto</h2>
    <p>Para dudas, correcciones, privacidad o derechos de autor: ${contactLink()}.</p>

    <h2 id="aviso-legal">Aviso legal</h2>
    <p>En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de los datos del titular de esta web:</p>
    <dl class="facts">
      <dt>Titular</dt><dd>${ownerName()}</dd>
      <dt>Nombre comercial</dt><dd>Factor Inédito</dd>
      <dt>NIF</dt><dd>${o.taxId ? esc(o.taxId) : pending("NIF, si el canal tiene actividad económica")}</dd>
      <dt>Domicilio</dt><dd>${o.address ? esc(o.address) : pending("domicilio, si el canal tiene actividad económica")}</dd>
      <dt>Correo electrónico</dt><dd>${contactLink()}</dd>
      <dt>Web</dt><dd><code>${config.origin}${config.basePath}</code></dd>
    </dl>
    <p>Esta web informa sobre el canal de divulgación Factor Inédito y sobre la herramienta AutoContent Studio. Su uso implica aceptar las <a href="${url("condiciones/")}">condiciones de uso</a>.</p>

    <h2 id="cookies">Cookies</h2>
    <p>Esta web <strong>no usa cookies</strong>, ni propias ni de terceros, y no guarda nada en tu navegador. Por eso no muestra ningún aviso de cookies. Tampoco usa herramientas de analítica ni publicidad.</p>

    <h2 id="terceros">Servicios de terceros</h2>
    <ul>
      <li><strong>Alojamiento:</strong> GitHub Pages (GitHub, Inc.). Registra la dirección IP de las visitas con fines de seguridad (${ext("https://docs.github.com/es/pages/getting-started-with-github-pages/what-is-github-pages", "documentación de GitHub Pages")}) y la trata según su ${ext("https://docs.github.com/es/site-policy/privacy-policies/github-general-privacy-statement", "declaración de privacidad")}.</li>
      <li><strong>Tipografías:</strong> Bricolage Grotesque y Newsreader (SIL Open Font License 1.1), servidas desde esta misma web. No se hace ninguna petición a servicios de fuentes externos.</li>
      <li><strong>Enlaces externos:</strong> los enlaces a YouTube, TikTok, Google y otras webs llevan a servicios con sus propias condiciones y políticas.</li>
    </ul>

    <h2 id="responsabilidad">Responsabilidad</h2>
    <p>El titular procura que la información de esta web sea correcta y esté actualizada, pero no se hace responsable de los daños que puedan derivarse de errores o de la indisponibilidad temporal de la web, ni del contenido de los sitios enlazados.</p>

    <h2 id="privacidad">Privacidad</h2>
    <p>El tratamiento de datos personales se explica en la <a href="${url("privacidad/")}">política de privacidad</a>.</p>
  </div>
</article>`;
  return page({ path: "legal/", title: "Aviso legal, cookies y contacto", description: "Datos del titular, contacto, información sobre cookies (no se usan) y servicios de terceros de la web de Factor Inédito.", main });
}
