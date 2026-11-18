import { config, html, esc, url, ext } from "../lib.mjs";
import { page } from "../layout.mjs";

export const SCOPES = [
  ["https://www.googleapis.com/auth/youtube.upload", "Subir vídeos al canal", "Subir cada vídeo terminado (título, descripción, etiquetas, visibilidad, fecha de publicación y la marca de contenido sintético) y su miniatura."],
  ["https://www.googleapis.com/auth/youtube.readonly", "Ver la información del canal", "Mostrar en el panel el nombre del canal conectado y consultar el estado y las estadísticas públicas (visualizaciones, «me gusta» y comentarios) de los vídeos que la propia herramienta ha subido."],
];

export default function autocontent() {
  const legalLinks = html`<p class="legal-links"><a href="${url("privacidad/")}">Política de privacidad</a><a href="${url("condiciones/")}">Condiciones de uso</a></p>`;
  const main = html`
<article class="prose-page">
  <header class="page-head">
    <h1>AutoContent Studio</h1>
    <p class="lede">La herramienta con la que se producen y publican los vídeos de Factor Inédito. Funciona en un ordenador personal y se conecta a YouTube mediante Google OAuth.</p>
    ${legalLinks}
  </header>

  <div class="prose">
    <h2 id="que-es">Qué es</h2>
    <p>AutoContent Studio es un programa propio, instalado y ejecutado en el ordenador del titular del canal. No es un servicio web: no tiene servidores, cuentas de usuario ni base de datos en internet. Tiene un panel de control que solo es accesible desde ese mismo ordenador. <strong>No se ofrece al público</strong>: su único usuario es el titular de Factor Inédito, que lo usa para gestionar su propio canal.</p>
    <p>En la pantalla de permisos de Google aparece con el nombre <strong>${esc(config.oauthAppName)}</strong>.</p>

    <h2 id="que-hace">Qué hace</h2>
    <ol>
      <li><strong>Prepara vídeos:</strong> archiva las fuentes de cada guion y comprueba sus datos, genera la voz, sincroniza los subtítulos, compone la música, anima el vídeo con Remotion y crea las miniaturas.</li>
      <li><strong>Revisa la calidad</strong> automáticamente (sonido, imagen, subtítulos, fuentes y licencias).</li>
      <li><strong>Programa y publica:</strong> sube a YouTube los vídeos que superan el control de calidad (y, si el titular lo ha exigido, su aprobación manual) en la fecha del calendario editorial y envía los vídeos cortos a TikTok a través de Buffer.</li>
      <li><strong>Consulta resultados:</strong> lee una vez al día las estadísticas de los vídeos que ha subido para mostrarlas en su panel.</li>
    </ol>
    <p>Por defecto funciona en <strong>modo prueba</strong>, en el que no se envía nada a ninguna plataforma. Publicar de verdad, en privado o en público, requiere que el titular lo active expresamente.</p>

    <h2 id="youtube">Integración con YouTube Data API v3</h2>
    <p>AutoContent Studio usa los servicios de la API de YouTube (YouTube API Services). Al conectarlo, el titular autoriza estos permisos a través de Google OAuth:</p>
    <div class="table-wrap"><table>
      <caption>Permisos OAuth que solicita</caption>
      <thead><tr><th scope="col">Permiso</th><th scope="col">Para qué se usa</th></tr></thead>
      <tbody>${SCOPES.map(([scope, name, why]) => html`<tr><td><strong>${name}</strong><br><code>${scope}</code></td><td>${why}</td></tr>`)}</tbody>
    </table></div>
    <p>Llamadas que realiza: <code>videos.insert</code> (subida reanudable), <code>thumbnails.set</code> (miniatura del vídeo recién subido), <code>videos.list</code> (estado y estadísticas de sus propios vídeos) y <code>channels.list</code> con <code>mine=true</code> (nombre e identificador del canal conectado).</p>
    <p><strong>Lo que no hace:</strong> no lee comentarios, suscriptores, mensajes ni datos de otros canales; no borra ni modifica vídeos que ya estaban en el canal; no usa la API de YouTube Analytics; no muestra anuncios ni vende datos.</p>

    <h2 id="datos">Datos de Google que guarda</h2>
    <p>Todo se guarda solo en el ordenador donde funciona el programa:</p>
    <ul>
      <li>Los <strong>tokens de acceso y de actualización</strong> de OAuth, en un archivo de la carpeta de datos del programa.</li>
      <li>El <strong>nombre y el identificador del canal</strong> conectado.</li>
      <li>Los <strong>identificadores, enlaces, estado y estadísticas</strong> de los vídeos que ha subido.</li>
    </ul>
    <p>Los datos de YouTube no se envían a Buffer, a Cloudinary ni a ningún otro servicio. Los detalles (cómo se protegen, cuánto tiempo se conservan, cómo revocar el acceso y cómo pedir que se borren) están en la <a href="${url("privacidad/")}#google">política de privacidad</a>.</p>

    <h2 id="terceros">Otros servicios que utiliza</h2>
    <ul>
      <li><strong>Buffer</strong>, para publicar en TikTok. Recibe el texto de la publicación y un enlace temporal al vídeo.</li>
      <li><strong>Cloudinary</strong>, para alojar el vídeo durante el tiempo necesario para que Buffer lo descargue. El programa lo borra de Cloudinary cuando Buffer confirma la publicación.</li>
      <li><strong>Wikipedia y Wikimedia Commons</strong>, para investigar temas, archivar fuentes y descargar imágenes con licencia libre.</li>
    </ul>

    <h2 id="revocar">Desconectar YouTube</h2>
    <p>El acceso se puede retirar en cualquier momento desde ${ext("https://myaccount.google.com/permissions", "la página de permisos de tu cuenta de Google")}. Los pasos y el borrado de los datos guardados se explican en la <a href="${url("privacidad/")}#revocar">política de privacidad</a>.</p>
  </div>
  <footer class="page-foot">${legalLinks}</footer>
</article>`;
  return page({ path: "autocontent-studio/", title: "AutoContent Studio", description: "Qué es AutoContent Studio, cómo usa Google OAuth y la YouTube Data API v3, qué datos guarda y cómo revocar el acceso.", main });
}
