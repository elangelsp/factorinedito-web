import { config, html, url, ext, ownerName, contactLink, fmtDate } from "../lib.mjs";
import { page } from "../layout.mjs";
import { toc } from "./privacidad.mjs";

const TOC = [["objeto", "Objeto"], ["servicio", "El servicio y quién lo usa"], ["limitaciones", "Limitaciones"], ["contenidos", "Responsabilidad sobre los contenidos"],
  ["integraciones", "Integraciones externas"], ["apis", "Uso de APIs externas"], ["propiedad", "Derechos de autor y propiedad intelectual"], ["web", "Uso de esta web"],
  ["cambios", "Cambios"], ["ley", "Ley aplicable y contacto"]];

export default function condiciones() {
  const main = html`
<article class="prose-page legal">
  <header class="page-head">
    <h1>Condiciones de uso</h1>
    <p class="lede">Condiciones de AutoContent Studio y de esta web.</p>
    <p class="meta">Última actualización: <time datetime="${config.lastLegalUpdate}">${fmtDate(config.lastLegalUpdate)}</time></p>
  </header>
  <div class="legal-layout">
  ${toc(TOC)}
  <div class="prose">
    <p class="note">Texto informativo; no constituye asesoramiento jurídico.</p>

    <h2 id="objeto">1. Objeto</h2>
    <p>Estas condiciones regulan el uso de AutoContent Studio (la aplicación que aparece en Google como «${config.oauthAppName}») y de la web de Factor Inédito. Su titular es ${ownerName()}.</p>

    <h2 id="servicio">2. El servicio y quién lo usa</h2>
    <p>AutoContent Studio es una herramienta privada que funciona en el ordenador de su titular para producir vídeos divulgativos, comprobar sus datos contra fuentes archivadas, programarlos y publicarlos en el canal Factor Inédito de YouTube y en su cuenta de TikTok. No se comercializa ni se ofrece a otras personas, y no se puede usar para gestionar canales de terceros. El código de la aplicación es privado.</p>

    <h2 id="limitaciones">3. Limitaciones</h2>
    <ul>
      <li><strong>Automatización:</strong> los guiones los redacta un asistente de IA y la comprobación de datos y el control de calidad son automáticos. Reducen errores, pero no garantizan que un vídeo sea exacto o completo. No todos los vídeos se revisan manualmente.</li>
      <li><strong>Disponibilidad:</strong> la herramienta solo trabaja cuando el ordenador del titular está encendido. Una publicación puede retrasarse o no producirse por fallos técnicos, por límites de cuota de las APIs o por decisiones de las plataformas.</li>
      <li><strong>Plataformas externas:</strong> YouTube, TikTok, Buffer y Cloudinary pueden cambiar o retirar sus servicios en cualquier momento, y eso puede afectar al funcionamiento de la herramienta.</li>
      <li>La herramienta y esta web se ofrecen tal cual, sin garantías de funcionamiento ininterrumpido.</li>
    </ul>

    <h2 id="contenidos">4. Responsabilidad sobre los contenidos</h2>
    <p>El titular es responsable de los vídeos que se publican en el canal, aunque se hayan producido de forma automatizada. Los vídeos tienen fines divulgativos y no sustituyen el consejo de un profesional. Si detectas un error o un contenido que vulnere tus derechos, escribe a ${contactLink()} indicando el vídeo y el motivo; se revisará y, si procede, se corregirá o retirará.</p>

    <h2 id="integraciones">5. Integraciones externas</h2>
    <p>AutoContent Studio se conecta a estos servicios, cada uno con sus propias condiciones:</p>
    <ul>
      <li>YouTube Data API v3 (Google): ${ext("https://www.youtube.com/t/terms", "Condiciones del servicio de YouTube")} y ${ext("https://developers.google.com/youtube/terms/api-services-terms-of-service", "Condiciones de los servicios de API de YouTube")}.</li>
      <li>Buffer, para publicar en TikTok: ${ext("https://buffer.com/legal", "condiciones de Buffer")}. TikTok: ${ext("https://www.tiktok.com/legal/terms-of-service", "condiciones de TikTok")}.</li>
      <li>Cloudinary, alojamiento temporal de vídeos: ${ext("https://cloudinary.com/tou", "condiciones de Cloudinary")}.</li>
      <li>Wikipedia y Wikimedia Commons, como fuentes y banco de imágenes: ${ext("https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use", "condiciones de uso de Wikimedia")}.</li>
    </ul>
    <p>El tratamiento de datos en estas integraciones se explica en la <a href="${url("privacidad/")}">política de privacidad</a>.</p>

    <h2 id="apis">6. Uso de APIs externas</h2>
    <ul>
      <li>La aplicación usa los servicios de la API de YouTube conforme a las ${ext("https://developers.google.com/youtube/terms/developer-policies", "políticas para desarrolladores de YouTube")}, las ${ext("https://developers.google.com/terms", "Condiciones de las API de Google")} y la ${ext("https://developers.google.com/terms/api-services-user-data-policy", "Política de datos de usuario de los servicios de API de Google")}.</li>
      <li>Solo solicita los permisos necesarios para subir vídeos y consultar los del propio canal, y no intenta eludir cuotas, límites ni mecanismos de verificación.</li>
      <li>Los vídeos se suben marcados como contenido alterado o sintético, y la visibilidad (privado, programado o público) la decide expresamente el titular en la configuración de la aplicación.</li>
    </ul>

    <h2 id="propiedad">7. Derechos de autor y propiedad intelectual</h2>
    <ul>
      <li>La marca, el logotipo, los textos y los vídeos de Factor Inédito pertenecen a su titular, salvo los elementos de terceros indicados a continuación.</li>
      <li>Las imágenes de terceros proceden de Wikimedia Commons y se usan solo con licencias que permiten reutilizarlas (dominio público, CC0, CC BY o CC BY-SA), citando su autoría en la descripción del vídeo.</li>
      <li>La voz se genera con el modelo «davefx» de Piper, publicado con licencia CC0. La música se compone automáticamente por la propia aplicación.</li>
      <li>Esta web usa las fuentes Bricolage Grotesque y Newsreader, con licencia SIL Open Font License 1.1. El código de esta web es público en ${ext("https://github.com/elangelsp/factorinedito-web", "GitHub")}.</li>
      <li>Si crees que un vídeo usa material tuyo sin permiso, escribe a ${contactLink()}.</li>
    </ul>

    <h2 id="web">8. Uso de esta web</h2>
    <p>La web es informativa y de acceso libre. Los enlaces a YouTube, TikTok y otros sitios llevan a servicios externos, de cuyo contenido y políticas no es responsable el titular.</p>

    <h2 id="cambios">9. Cambios</h2>
    <p>Estas condiciones pueden actualizarse cuando cambie el funcionamiento de la aplicación o de sus integraciones. La fecha de la última actualización aparece al principio.</p>

    <h2 id="ley">10. Ley aplicable y contacto</h2>
    <p>Estas condiciones se rigen por la legislación española. Para cualquier duda: ${contactLink()}. Más datos en el <a href="${url("legal/")}">aviso legal</a>.</p>
  </div>
  </div>
</article>`;
  return page({ path: "condiciones/", title: "Condiciones de uso", description: "Condiciones de uso de AutoContent Studio y de la web de Factor Inédito: servicio, limitaciones, contenidos, integraciones y propiedad intelectual.", main });
}
