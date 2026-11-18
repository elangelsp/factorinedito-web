# factorinedito-web

Web oficial de **Factor Inédito** («Lo extraordinario, explicado») y páginas públicas de **AutoContent Studio**, la
aplicación que publica en el canal mediante Google OAuth y YouTube Data API v3: página de la aplicación, política de
privacidad, condiciones de uso y aviso legal.

Publicada en Cloudflare Workers: <https://factorinedito-web.elangelsp.workers.dev/>

| Página | URL |
|---|---|
| Inicio | https://factorinedito-web.elangelsp.workers.dev/ |
| Sobre el canal | https://factorinedito-web.elangelsp.workers.dev/sobre/ |
| AutoContent Studio | https://factorinedito-web.elangelsp.workers.dev/autocontent-studio/ |
| Política de privacidad | https://factorinedito-web.elangelsp.workers.dev/privacidad/ |
| Condiciones de uso | https://factorinedito-web.elangelsp.workers.dev/condiciones/ |
| Aviso legal, cookies y contacto | https://factorinedito-web.elangelsp.workers.dev/legal/ |

## Cómo está hecha
- Web estática generada con un script de Node sin dependencias de ejecución (`src/build.mjs`). Sin servidor, sin base de
  datos, sin cookies, sin analítica y sin peticiones a terceros (las fuentes se sirven desde la propia web).
- Tipografías: Bricolage Grotesque y Newsreader (SIL OFL 1.1, paquetes `@fontsource-variable`).
- Gráficos SVG originales (logotipo, favicon, constelación de temas e iconos). `src/static/` contiene los PNG generados a
  partir de ellos (imagen Open Graph e iconos).

```
site.config.json      datos editables: URL, correo, titular, enlaces de los canales, código de Search Console
src/build.mjs         genera dist/
src/layout.mjs        cabecera, pie y metadatos (SEO, Open Graph, canonical)
src/pages/*.mjs       una página por archivo
src/styles.css        sistema visual
scripts/check.mjs     pruebas: enlaces y anclas, metadatos, contraste, requisitos de Google/YouTube, secretos
scripts/serve.mjs     vista previa local con la misma ruta base que producción
wrangler.jsonc        configuración de Cloudflare Workers (static assets desde dist/)
```

## Uso
```bash
npm ci
npm test                    # genera dist/ y pasa todas las comprobaciones
node scripts/serve.mjs      # http://127.0.0.1:8080/
```

## Despliegue
Cloudflare Workers Builds está conectado a este repositorio: cada push a `main` ejecuta la compilación y
`npx wrangler deploy`, que publica `dist/` como *static assets* según `wrangler.jsonc` (sin código de Worker):
`not_found_handling: "404-page"` sirve `404.html` con estado 404 y `html_handling: "auto-trailing-slash"` hace que
`/sobre` redirija a `/sobre/`. `wrangler.jsonc` incluye `build.command`, así que `npx wrangler deploy` también genera la web
antes de subirla. GitHub Actions (`.github/workflows/ci.yml`) solo compila y pasa las pruebas.

La URL y la ruta base salen de `site.config.json` (`origin` y `basePath`). Todas las rutas internas (CSS, JS, fuentes,
imágenes, páginas, canonical, Open Graph y sitemap) se generan a partir de esos dos valores, y `npm test` falla si algún
enlace interno no existe en `dist/`.

## Datos pendientes de completar
Edita `site.config.json` y haz push:
- `owner.name` (y, si el canal tiene actividad económica, `owner.taxId` y `owner.address`): mientras estén vacíos, las
  páginas legales muestran un aviso visible «[Pendiente: …]».
- `channels.youtube` y `channels.tiktok`: mientras estén vacíos, los botones indican «enlace en camino» y no enlazan a nada.
- `googleSiteVerification`: el valor `content` de la etiqueta que da Google Search Console (ver
  [docs/GOOGLE_OAUTH_SETUP.md](docs/GOOGLE_OAUTH_SETUP.md)).

## Notas
- `robots.txt` solo se lee en la raíz del dominio: se genera cuando `basePath` es `/` (como ahora) y apunta al `sitemap.xml`.
- Los textos legales describen el funcionamiento real de AutoContent Studio (repositorio privado) a fecha de
  `lastLegalUpdate`. Son informativos y no constituyen asesoramiento jurídico.
