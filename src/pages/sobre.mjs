import { html, url } from "../lib.mjs";
import { page, channelLinks } from "../layout.mjs";

export default function sobre() {
  const main = html`
<article class="prose-page">
  <header class="page-head">
    <h1>Sobre Factor Inédito</h1>
    <p class="lede">Lo extraordinario, explicado: vídeos en español para entender los descubrimientos, inventos y preguntas que parecen imposibles.</p>
  </header>

  <div class="prose">
    <h2 id="proposito">Para qué existe el canal</h2>
    <p>Hay datos que suenan a truco: que alguien midiera la Tierra con una sombra hace más de dos mil años, o que podamos saber a qué distancia está una galaxia que nunca visitaremos. Factor Inédito existe para explicar cómo se llegó a esas respuestas, paso a paso, sin necesidad de conocimientos previos.</p>

    <h2 id="filosofia">Cómo entendemos la divulgación</h2>
    <ul>
      <li><strong>Primero el dato, luego la emoción.</strong> Una cifra solo aparece si está en una fuente que se puede consultar.</li>
      <li><strong>Explicar el cómo, no solo el qué.</strong> Interesa el razonamiento que llevó al descubrimiento, no la anécdota suelta.</li>
      <li><strong>Distinguir lo sabido de lo discutido.</strong> Cuando algo es una hipótesis o una estimación, se dice.</li>
      <li><strong>Imágenes con permiso.</strong> Solo material propio o con licencias que permiten reutilizarlo, siempre con su atribución.</li>
    </ul>

    <h2 id="videos">Tipos de vídeos</h2>
    <p><strong>Shorts</strong> (vertical, de 35 a 60 segundos) para YouTube y TikTok: una pregunta y su respuesta. <strong>Vídeos largos</strong> (horizontal, de 8 a 12 minutos) para YouTube: una historia completa, con mapas, líneas de tiempo, diagramas y escenas en 3D. Los temas rotan entre ciencia, universo, tecnología, historia, curiosidades y grandes preguntas.</p>

    <h2 id="ia">Uso de inteligencia artificial</h2>
    <p>Queremos que sepas exactamente cómo se hacen los vídeos:</p>
    <ul>
      <li><strong>Guiones:</strong> los redacta un asistente de inteligencia artificial (Claude, de Anthropic) a partir de fuentes públicas, principalmente Wikipedia y otras fuentes de referencia.</li>
      <li><strong>Comprobación de datos:</strong> es automática. Cada afirmación importante del guion debe aparecer de forma literal en una fuente que el sistema descarga y archiva; si no se encuentra, el vídeo se detiene. Esta comprobación reduce errores, pero no los elimina: una fuente puede estar equivocada o un matiz puede perderse.</li>
      <li><strong>Voz:</strong> es sintética, generada por un modelo de voz que funciona en el propio ordenador. No es la voz de una persona real.</li>
      <li><strong>Imagen y música:</strong> las animaciones se generan con código, las imágenes proceden de Wikimedia Commons con licencias libres y la música se compone automáticamente.</li>
      <li><strong>Revisión humana:</strong> no todos los vídeos se revisan a mano antes de publicarse. La herramienta permite exigir una aprobación manual, pero esa opción puede estar desactivada; en ese caso el vídeo se publica tras superar el control de calidad automático.</li>
      <li><strong>Etiquetado:</strong> en YouTube los vídeos se marcan como contenido alterado o sintético.</li>
    </ul>
    <p>Si encuentras un error, escríbenos (los datos están en <a href="${url("legal/")}">contacto</a>) e indica el vídeo y el minuto. Las correcciones se tendrán en cuenta en los siguientes vídeos.</p>

    <h2 id="herramienta">La herramienta detrás del canal</h2>
    <p>La producción y la publicación se gestionan con <a href="${url("autocontent-studio/")}">AutoContent Studio</a>, un programa propio que funciona en un ordenador personal. En su página explicamos qué hace y cómo trata los datos de Google y YouTube.</p>
  </div>
  <div class="page-cta">${channelLinks("cta")}</div>
</article>`;
  return page({ path: "sobre/", title: "Sobre el canal", description: "Propósito, filosofía de divulgación, formatos y uso de inteligencia artificial en Factor Inédito.", main });
}
