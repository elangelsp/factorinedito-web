import { config, html, esc, url } from "../lib.mjs";
import { page, channelLinks } from "../layout.mjs";
import { glyph } from "../assets/marks.mjs";

export const TOPICS = [
  { id: "ciencia", name: "Ciencia", x: 352, y: 214, text: "Experimentos, leyes y descubrimientos que cambiaron cómo entendemos el mundo, contados con el dato exacto y su fuente." },
  { id: "universo", name: "Universo", x: 548, y: 96, text: "Planetas, estrellas y distancias que marean: cómo sabemos lo que sabemos del cosmos." },
  { id: "tecnologia", name: "Tecnología", x: 612, y: 312, text: "Inventos y máquinas, de la imprenta a los chips, explicados por dentro." },
  { id: "historia", name: "Historia", x: 420, y: 452, text: "Momentos y personas que cambiaron el rumbo, sin leyendas ni datos inventados." },
  { id: "curiosidades", name: "Curiosidades", x: 640, y: 548, text: "Lo raro, lo sorprendente y lo que casi nadie sabe, siempre comprobado." },
  { id: "preguntas", name: "Grandes preguntas", x: 186, y: 372, text: "¿Qué es el tiempo? ¿Estamos solos? Lo que la ciencia responde y lo que todavía no." },
];
const LINKS = [["universo", "ciencia"], ["ciencia", "tecnologia"], ["ciencia", "preguntas"], ["preguntas", "historia"], ["tecnologia", "historia"], ["historia", "curiosidades"]];

/** Deterministic star dust so every build is identical. */
function dust(n = 150) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: n }, () => {
    const r = 0.35 + rnd() * rnd() * 1.4;
    return `<circle cx="${(rnd() * 720).toFixed(1)}" cy="${(rnd() * 620).toFixed(1)}" r="${r.toFixed(2)}" opacity="${(0.25 + rnd() * 0.6).toFixed(2)}"/>`;
  }).join("");
}

function constellation() {
  const t = Object.fromEntries(TOPICS.map(x => [x.id, x]));
  const lines = LINKS.map(([a, b], i) => {
    const len = Math.hypot(t[a].x - t[b].x, t[a].y - t[b].y).toFixed(0);
    return `<line class="c-line" style="--len:${len};--i:${i}" x1="${t[a].x}" y1="${t[a].y}" x2="${t[b].x}" y2="${t[b].y}"/>`;
  }).join("");
  const stars = TOPICS.map((s, i) => {
    const left = s.x > 560;
    return html`<a class="c-star" href="#tema-${s.id}" style="--i:${i}">
      <circle class="halo" cx="${s.x}" cy="${s.y}" r="14"/><circle class="core" cx="${s.x}" cy="${s.y}" r="4.5"/>
      <text x="${left ? s.x - 16 : s.x + 16}" y="${s.y + 5}" text-anchor="${left ? "end" : "start"}">${s.name}</text></a>`;
  });
  const grid = [380, 520, 660, 800].map(r => `<circle cx="760" cy="-140" r="${r}"/>`).join("")
    + [200, 228, 256, 284].map(a => { const rad = (a * Math.PI) / 180; return `<line x1="760" y1="-140" x2="${(760 + Math.cos(rad) * 900).toFixed(0)}" y2="${(-140 - Math.sin(rad) * 900).toFixed(0)}"/>`; }).join("");
  return html`<svg class="constellation" viewBox="0 0 720 620" role="img" aria-labelledby="c-title">
    <title id="c-title">Mapa de estrellas con los seis temas del canal</title>
    <g class="c-grid" aria-hidden="true">${grid}</g>
    <g class="c-dust" aria-hidden="true">${dust()}</g>
    <g aria-hidden="true">${lines}</g>
    <g>${stars}</g>
  </svg>`;
}

export default function home() {
  const main = html`
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <h1 id="hero-title" class="wordmark"><span>Factor</span> <span>Inédito</span></h1>
    <p class="hero-tagline">${esc(config.tagline)}</p>
    <p class="hero-intro">Un canal en español para entender lo que parece imposible: ciencia, universo, tecnología, historia y las preguntas que aún no tienen respuesta. Vídeos cortos y largos, con animaciones propias y cada dato comprobado en su fuente.</p>
    <div class="hero-actions">${channelLinks("cta")}</div>
  </div>
  ${constellation()}
</section>

<section class="topics" aria-labelledby="topics-title">
  <div class="section-head">
    <h2 id="topics-title">Seis rumbos para la curiosidad</h2>
    <p>Cada vídeo parte de una pregunta concreta y termina con una explicación que puedas contar a otra persona.</p>
  </div>
  <ul class="topic-list">
    ${TOPICS.map(t => html`<li id="tema-${t.id}">${glyph(t.id)}<h3>${t.name}</h3><p>${t.text}</p></li>`)}
  </ul>
</section>

<section class="formats" aria-labelledby="formats-title">
  <div class="section-head">
    <h2 id="formats-title">Dos formatos, la misma exigencia</h2>
    <p>Las barras muestran la duración real de cada formato a la misma escala.</p>
  </div>
  <div class="format-grid">
    <article class="format">
      <div class="frame frame-vertical" aria-hidden="true"><span>9:16</span></div>
      <div>
        <h3>Shorts</h3>
        <p>Vertical, de 35 a 60 segundos, para YouTube Shorts y TikTok. Una idea, un dato sorprendente y su explicación.</p>
        <div class="duration" role="img" aria-label="Duración: entre 35 y 60 segundos"><span style="--from:${(35 / 720) * 100}%;--to:${(60 / 720) * 100}%"></span></div>
      </div>
    </article>
    <article class="format">
      <div class="frame frame-wide" aria-hidden="true"><span>16:9</span></div>
      <div>
        <h3>Vídeos largos</h3>
        <p>Horizontal, de 8 a 12 minutos, en YouTube. Tiempo para recorrer una historia entera con mapas, diagramas y escenas en 3D.</p>
        <div class="duration" role="img" aria-label="Duración: entre 8 y 12 minutos"><span style="--from:${(480 / 720) * 100}%;--to:100%"></span></div>
      </div>
    </article>
  </div>
  <p class="scale-note">Escala: de 0 a 12 minutos.</p>
</section>

<section class="process" aria-labelledby="process-title">
  <div class="section-head">
    <h2 id="process-title">Cómo se hace un vídeo</h2>
    <p>La producción está automatizada con <a href="${url("autocontent-studio/")}">AutoContent Studio</a>, una herramienta propia. Estos son sus pasos, en orden.</p>
  </div>
  <ol class="steps">
    <li><h3>Elegir el tema</h3><p>A partir de lo que más se consulta en Wikipedia en español y de una lista de temas atemporales.</p></li>
    <li><h3>Escribir el guion con fuentes</h3><p>Un asistente de IA redacta el guion. Cada dato importante debe aparecer literalmente en una fuente archivada; si no aparece, el vídeo no sigue adelante.</p></li>
    <li><h3>Poner voz</h3><p>Una voz sintética en español, generada en el propio ordenador.</p></li>
    <li><h3>Animar</h3><p>Gráficos, mapas y escenas en 3D programados con Remotion, e imágenes de Wikimedia Commons con licencia libre y su atribución.</p></li>
    <li><h3>Revisar la calidad</h3><p>Comprobaciones automáticas de sonido, imagen, subtítulos, fuentes y derechos de uso.</p></li>
    <li><h3>Publicar</h3><p>En YouTube, marcado como contenido sintético, y en TikTok a través de Buffer.</p></li>
  </ol>
  <p class="process-more"><a href="${url("sobre/")}">Más sobre el uso de IA en el canal</a></p>
</section>

<section class="latest" aria-labelledby="latest-title">
  <h2 id="latest-title">Primeros vídeos</h2>
  <div class="latest-empty">
    <p>Todavía no hay vídeos publicados. Los primeros están en preparación; cuando salgan, los encontrarás en los canales oficiales.</p>
    <div class="hero-actions">${channelLinks()}</div>
  </div>
</section>`;
  return page({ path: "", main, bodyClass: "home" });
}
