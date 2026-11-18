# factorinedito-web

Web oficial de **Factor Inédito** («Lo extraordinario, explicado») y páginas públicas de **AutoContent Studio**, la
aplicación que publica en el canal mediante Google OAuth y YouTube Data API v3: página de la aplicación, política de
privacidad, condiciones de uso y aviso legal.

Publicada en GitHub Pages: <https://elangelsp.github.io/factorinedito-web/>

| Página | URL |
|---|---|
| Inicio | https://elangelsp.github.io/factorinedito-web/ |
| Sobre el canal | https://elangelsp.github.io/factorinedito-web/sobre/ |
| AutoContent Studio | https://elangelsp.github.io/factorinedito-web/autocontent-studio/ |
| Política de privacidad | https://elangelsp.github.io/factorinedito-web/privacidad/ |
| Condiciones de uso | https://elangelsp.github.io/factorinedito-web/condiciones/ |
| Aviso legal, cookies y contacto | https://elangelsp.github.io/factorinedito-web/legal/ |

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
scripts/serve.mjs     vista previa local bajo /factorinedito-web/
```

## Uso
```bash
npm ci
npm test                    # genera dist/ y pasa todas las comprobaciones
node scripts/serve.mjs      # http://127.0.0.1:8080/factorinedito-web/
```

## Despliegue
Cada push a `main` ejecuta `.github/workflows/deploy.yml`: instala, genera, comprueba y publica `dist/` en GitHub Pages.
Una sola vez: **Settings → Pages → Build and deployment → Source: GitHub Actions**. GitHub Pages sirve los sitios
`github.io` por HTTPS.

## Datos pendientes de completar
Edita `site.config.json` y haz push:
- `owner.name` (y, si el canal tiene actividad económica, `owner.taxId` y `owner.address`): mientras estén vacíos, las
  páginas legales muestran un aviso visible «[Pendiente: …]».
- `channels.youtube` y `channels.tiktok`: mientras estén vacíos, los botones indican «enlace en camino» y no enlazan a nada.
- `googleSiteVerification`: el valor `content` de la etiqueta que da Google Search Console (ver
  [docs/GOOGLE_OAUTH_SETUP.md](docs/GOOGLE_OAUTH_SETUP.md)).

## Notas
- `robots.txt` solo se lee en la raíz del dominio, así que no se genera mientras la web viva en un subdirectorio
  (`basePath` distinto de `/`). El `sitemap.xml` sí se genera y puede enviarse desde Search Console.
- Los textos legales describen el funcionamiento real de AutoContent Studio (repositorio privado) a fecha de
  `lastLegalUpdate`. Son informativos y no constituyen asesoramiento jurídico.
