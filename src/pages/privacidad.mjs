import { config, html, url, ext, ownerName, contactLink, fmtDate } from "../lib.mjs";
import { page } from "../layout.mjs";
import { SCOPES } from "./autocontent.mjs";

export const TOC = [
  ["responsable", "Responsable y contacto"], ["alcance", "A qué se aplica"], ["web", "Esta web"], ["app", "AutoContent Studio"],
  ["google", "Datos de Google y YouTube"], ["uso", "Para qué se usan"], ["almacenamiento", "Dónde se guardan y cómo se protegen"],
  ["conservacion", "Cuánto tiempo se conservan"], ["compartir", "Con quién se comparten"], ["revocar", "Cómo revocar el acceso"],
  ["eliminar", "Cómo pedir que se borren"], ["politicas", "Políticas de Google y YouTube"], ["derechos", "Tus derechos"],
  ["menores", "Menores"], ["cambios", "Cambios en esta política"],
];
export const toc = items => html`<nav class="toc" aria-label="En esta página"><p class="toc-title">En esta página</p><ol>${items.map(([id, t]) => html`<li><a href="#${id}">${t}</a></li>`)}</ol></nav>`;

export default function privacidad() {
  const main = html`
<article class="prose-page legal">
  <header class="page-head">
    <h1>Política de privacidad</h1>
    <p class="lede">Cómo tratan los datos personales la web de Factor Inédito y la aplicación AutoContent Studio, incluidos los datos de Google y YouTube.</p>
    <p class="meta">Última actualización: <time datetime="${config.lastLegalUpdate}">${fmtDate(config.lastLegalUpdate)}</time></p>
  </header>
  <div class="legal-layout">
  ${toc(TOC)}
  <div class="prose">
    <p class="note">Este texto describe lo que hace realmente el software en la fecha indicada. Es informativo y no constituye asesoramiento jurídico.</p>

    <h2 id="responsable">1. Responsable y contacto</h2>
    <p>Responsable del tratamiento: ${ownerName()}, titular del canal Factor Inédito y de la aplicación AutoContent Studio.</p>
    <p>Correo de contacto para cualquier cuestión sobre privacidad, quejas o solicitudes: ${contactLink()}.</p>

    <h2 id="alcance">2. A qué se aplica</h2>
    <p>Esta política cubre dos cosas: (a) esta web, publicada en <code>${config.origin}${config.basePath}</code>, y (b) AutoContent Studio, la aplicación que se conecta a YouTube mediante Google OAuth con el nombre «${config.oauthAppName}». No cubre YouTube, TikTok ni otros servicios externos, que tienen sus propias políticas.</p>

    <h2 id="web">3. Esta web</h2>
    <ul>
      <li>Es una web estática: no tiene formularios, registro, comentarios ni base de datos.</li>
      <li>No almacena información en tu navegador y no incluye analítica, publicidad, vídeos incrustados ni otro contenido de terceros. Las fuentes tipográficas se sirven desde la propia web.</li>
      <li>Está alojada en ${config.hosting.name} (${config.hosting.company}). Para entregar las páginas y protegerlas frente a abusos, Cloudflare trata datos técnicos de cada visita, como la dirección IP, según su ${ext(config.hosting.privacyUrl, "política de privacidad")}. El titular no accede a esos datos ni tiene activada ninguna analítica.</li>
      <li>La web no crea cookies. Cloudflare puede colocar cookies técnicas estrictamente necesarias para su protección frente a bots (por ejemplo, <code>__cf_bm</code>) cuando esa protección está activa; se describen en su ${ext(config.hosting.cookiesUrl, "lista de cookies")}.</li>
      <li>Si escribes al correo de contacto, tu mensaje y tu dirección se usarán solo para responderte y se conservarán mientras sea necesario para atender tu consulta.</li>
    </ul>

    <h2 id="app">4. AutoContent Studio</h2>
    <p>AutoContent Studio es un programa que funciona en el ordenador personal del titular. No es un servicio en internet: no tiene servidores propios ni cuentas de usuario, y no se ofrece al público. Su único usuario es el titular, que lo conecta a su propio canal de YouTube (Factor Inédito). Por tanto, los únicos datos de Google que trata son los de la cuenta del titular. Más información en la <a href="${url("autocontent-studio/")}">página de AutoContent Studio</a>.</p>

    <h2 id="google">5. Datos de Google y YouTube a los que accede</h2>
    <p>AutoContent Studio usa los <strong>servicios de la API de YouTube</strong> (YouTube API Services). Solicita estos permisos:</p>
    <div class="table-wrap"><table>
      <caption>Permisos OAuth</caption>
      <thead><tr><th scope="col">Permiso</th><th scope="col">Uso</th></tr></thead>
      <tbody>${SCOPES.map(([scope, name, why]) => html`<tr><td><strong>${name}</strong><br><code>${scope}</code></td><td>${why}</td></tr>`)}</tbody>
    </table></div>
    <p>Con esos permisos, la aplicación obtiene y guarda:</p>
    <ul>
      <li><strong>Tokens de OAuth</strong> (de acceso y de actualización) emitidos por Google.</li>
      <li><strong>Identificador y nombre del canal</strong> conectado.</li>
      <li>De los vídeos que la propia aplicación sube: <strong>identificador, enlace, estado de privacidad y de procesamiento, y estadísticas</strong> (visualizaciones, «me gusta» y número de comentarios).</li>
    </ul>
    <p>No accede al contenido de comentarios, a la lista de suscriptores, a mensajes, a datos de otros canales ni a otros servicios de Google. Tampoco usa la API de YouTube Analytics.</p>

    <h2 id="uso">6. Para qué se usan</h2>
    <ul>
      <li>Subir al canal los vídeos producidos, con su título, descripción, etiquetas, miniatura, visibilidad y fecha de publicación, y marcarlos como contenido sintético.</li>
      <li>Mostrar en el panel local qué canal está conectado y el estado de cada publicación.</li>
      <li>Mostrar las estadísticas de los vídeos propios para decidir qué temas funcionan mejor.</li>
    </ul>
    <p>Los datos de Google no se usan para publicidad, no se venden y no se usan para entrenar modelos de inteligencia artificial.</p>

    <h2 id="almacenamiento">7. Dónde se guardan y cómo se protegen</h2>
    <ul>
      <li>Todo se guarda en el disco del ordenador donde funciona la aplicación. Nada se guarda en servidores del titular, porque no los hay.</li>
      <li>Los tokens de OAuth están en un archivo JSON dentro de la carpeta de datos de la aplicación (<code>content/secrets</code>). <strong>La aplicación no cifra este archivo</strong>: está protegido por los permisos de la cuenta de usuario del sistema operativo. Esa carpeta está excluida del control de versiones y nunca se publica.</li>
      <li>El nombre del canal, los datos de los vídeos y las estadísticas están en una base de datos SQLite local. La aplicación guarda copias de seguridad diarias de esa base de datos en el mismo ordenador y conserva las 14 más recientes.</li>
      <li>El panel de control solo escucha en la dirección local del ordenador (127.0.0.1), así que no es accesible desde otros equipos.</li>
      <li>Las comunicaciones con Google, Buffer y Cloudinary usan HTTPS.</li>
    </ul>

    <h2 id="conservacion">8. Cuánto tiempo se conservan</h2>
    <ul>
      <li><strong>Tokens de OAuth:</strong> mientras YouTube esté conectado. Al pulsar «Desconectar YouTube» en el panel, se eliminan las credenciales de la aplicación guardadas en el panel y el archivo de tokens se renombra como copia de seguridad (<code>.bak</code>). Esa copia permanece en el disco hasta que se borra manualmente; por eso, para retirar el acceso del todo, sigue también los pasos del apartado 10.</li>
      <li><strong>Datos de vídeos y estadísticas:</strong> la aplicación no los borra automáticamente. Se eliminan cuando el titular borra los datos de la aplicación (apartado 11).</li>
      <li><strong>Copias de seguridad:</strong> se conservan las 14 más recientes; las anteriores se eliminan automáticamente.</li>
      <li><strong>Registros técnicos</strong> (mensajes de funcionamiento y de error) en la carpeta de la aplicación: no tienen borrado automático.</li>
    </ul>

    <h2 id="compartir">9. Con quién se comparten</h2>
    <p>Los datos de Google y YouTube <strong>no se comparten, venden ni ceden</strong> a terceros. En concreto:</p>
    <ul>
      <li><strong>Google/YouTube</strong> recibe los vídeos y sus metadatos al subirlos, que es la finalidad de la aplicación.</li>
      <li><strong>Buffer</strong> (para publicar en TikTok) recibe el texto de la publicación y un enlace temporal al vídeo. No recibe datos de YouTube.</li>
      <li><strong>Cloudinary</strong> aloja el archivo de vídeo durante el tiempo necesario para que Buffer lo descargue, y la aplicación lo borra cuando Buffer confirma la publicación. No recibe datos de YouTube.</li>
      <li><strong>Asistente de IA:</strong> los guiones se escriben con Claude (Anthropic) usando fuentes públicas, sin enviarle datos de Google. Si el titular usa ese asistente en su ordenador para revisar el estado del proyecto, el asistente puede leer archivos locales de la aplicación, incluida la base de datos con las estadísticas de los vídeos del propio canal.</li>
    </ul>

    <h2 id="revocar">10. Cómo revocar el acceso</h2>
    <ol>
      <li>Entra en ${ext("https://myaccount.google.com/permissions", "Terceros con acceso a tu cuenta de Google")} (también disponible en ${ext("https://security.google.com/settings/security/permissions", "security.google.com/settings/security/permissions")}).</li>
      <li>Elige <strong>${config.oauthAppName}</strong> y pulsa <strong>Eliminar todo el acceso</strong>. Los tokens guardados dejan de funcionar en ese momento.</li>
      <li>En el panel de AutoContent Studio, pulsa <strong>Ajustes → Cuentas → Desconectar YouTube</strong>.</li>
      <li>Borra los datos guardados como se indica en el apartado 11.</li>
    </ol>

    <h2 id="eliminar">11. Cómo pedir que se borren los datos</h2>
    <p>Escribe a ${contactLink()} indicando qué datos quieres que se borren. Los datos de Google y YouTube guardados se eliminarán en un plazo máximo de 7 días naturales desde la solicitud, y en un máximo de 30 días si el acceso se ha revocado desde la cuenta de Google. El borrado consiste en eliminar del ordenador del titular:</p>
    <ul>
      <li>el archivo de tokens y sus copias <code>.bak</code> en <code>content/secrets</code>;</li>
      <li>los datos del canal, de las publicaciones y las estadísticas de la base de datos local, y</li>
      <li>las copias de seguridad que los contengan.</li>
    </ul>
    <p>Recibirás una confirmación por correo cuando el borrado esté hecho.</p>

    <h2 id="politicas">12. Políticas de Google y YouTube</h2>
    <ul>
      <li>Al usar AutoContent Studio, el titular acepta las ${ext("https://www.youtube.com/t/terms", "Condiciones del servicio de YouTube")}.</li>
      <li>El tratamiento de datos por parte de Google se rige por la ${ext("https://policies.google.com/privacy", "Política de privacidad de Google")} (${ext("http://www.google.com/policies/privacy", "google.com/policies/privacy")}).</li>
      <li>El uso y la transferencia a cualquier otra aplicación de la información recibida de las API de Google se ajusta a la ${ext("https://developers.google.com/terms/api-services-user-data-policy", "Política de datos de usuario de los servicios de API de Google")}, incluidos los requisitos de uso limitado.</li>
    </ul>

    <h2 id="derechos">13. Tus derechos</h2>
    <p>De acuerdo con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${contactLink()}. La base para tratar los datos de Google es el consentimiento que da el titular de la cuenta al autorizar la aplicación; puede retirarlo en cualquier momento (apartado 10). Si crees que tus derechos no se han respetado, puedes reclamar ante la ${ext("https://www.aepd.es", "Agencia Española de Protección de Datos")}.</p>

    <h2 id="menores">14. Menores</h2>
    <p>Ni esta web ni AutoContent Studio recogen datos de menores. La aplicación solo trata datos de la cuenta de su titular.</p>

    <h2 id="cambios">15. Cambios en esta política</h2>
    <p>Si cambia lo que hace la aplicación con los datos, esta página se actualizará antes y cambiará la fecha de «Última actualización». El historial de cambios es público en el repositorio de esta web.</p>
  </div>
  </div>
</article>`;
  return page({ path: "privacidad/", title: "Política de privacidad", description: "Qué datos de Google y YouTube usa AutoContent Studio, dónde se guardan, cuánto tiempo, cómo revocar el acceso y cómo pedir su eliminación.", main });
}
