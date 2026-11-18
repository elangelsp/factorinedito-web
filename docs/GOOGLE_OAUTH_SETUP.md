# Google Cloud: completar la información de marca de AutoContent Studio

Guía para usar esta web en **Google Auth Platform** con la aplicación OAuth de AutoContent Studio (YouTube Data API v3).
Revisada el 18/11/2026 con la documentación oficial de Google enlazada al final.

> Estado: la web está preparada. Ni la verificación del dominio en Search Console ni la aceptación del dominio en Google
> Cloud se han probado todavía (requieren tu cuenta de Google). Nada de lo que hay aquí significa que la aplicación esté
> verificada o aprobada por Google.

## 0. URLs
| Campo | Valor |
|---|---|
| Página principal de la aplicación | `https://elangelsp.github.io/factorinedito-web/autocontent-studio/` |
| Política de privacidad | `https://elangelsp.github.io/factorinedito-web/privacidad/` |
| Condiciones del servicio | `https://elangelsp.github.io/factorinedito-web/condiciones/` |
| Dominio autorizado | `elangelsp.github.io` |
| Nombre de la aplicación | `AutoContent Studio` (igual que en la web) |
| Correo de asistencia y de contacto del desarrollador | `rataxd24@gmail.com` |

Se usa la página de AutoContent Studio como página principal porque Google exige que la página principal identifique la
aplicación, describa su funcionalidad y enlace a la misma política de privacidad que el consentimiento; esa página cumple
las tres cosas y enlaza la privacidad y las condiciones arriba y abajo.

## 1. Publicar la web (una vez)
1. Haz push de este repositorio (`git push origin main`).
2. GitHub → repositorio `factorinedito-web` → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Pestaña **Actions**: espera a que «Publicar en GitHub Pages» termine en verde. Abre las URLs de la tabla.

## 2. Verificar la propiedad en Google Search Console
Hazlo con **la misma cuenta de Google que es propietaria (Owner) o editora del proyecto de Google Cloud**.

`github.io` está en la lista de sufijos públicos, así que el «dominio privado de nivel superior» que Google pide verificar
es `elangelsp.github.io`. Con GitHub Pages no controlas el DNS de ese dominio, así que **no puedes crear una propiedad de
tipo «Dominio»** (solo se verifica por DNS). Hay que usar una propiedad de **prefijo de URL**.

### Opción A — prefijo con la ruta del proyecto (solo este repositorio)
1. https://search.google.com/search-console → **Añadir propiedad → Prefijo de la URL** →
   `https://elangelsp.github.io/factorinedito-web/` → Continuar.
2. Método **Etiqueta HTML**. Copia solo el valor de `content="…"`.
3. Pégalo en `site.config.json` → `"googleSiteVerification": "…"`, haz commit y push y espera al despliegue.
4. Comprueba que aparece: `https://elangelsp.github.io/factorinedito-web/` → ver código fuente → `google-site-verification`.
5. Pulsa **Verificar** en Search Console. No borres la etiqueta: Google la revisa periódicamente.

Pendiente de comprobar: si Google Cloud acepta `elangelsp.github.io` como dominio autorizado verificado cuando solo está
verificada una propiedad con ruta. Si al guardar la marca dice que el dominio no está verificado, usa la opción B.

### Opción B — prefijo de la raíz `https://elangelsp.github.io/` (necesita un segundo repositorio)
La raíz de `elangelsp.github.io` solo la sirve un repositorio llamado exactamente `elangelsp.github.io`.
1. Crea en GitHub el repositorio público `elangelsp.github.io`.
2. En Search Console: **Prefijo de la URL** → `https://elangelsp.github.io/` → método **Archivo HTML** → descarga
   `googleXXXXXXXX.html`.
3. Sube ese archivo sin modificarlo a la raíz del repositorio nuevo, junto a un `index.html` que enlace a la web:
   ```html
   <!doctype html><meta charset="utf-8"><title>Factor Inédito</title>
   <meta http-equiv="refresh" content="0; url=/factorinedito-web/">
   <a href="/factorinedito-web/">Factor Inédito</a>
   ```
4. Settings → Pages → Deploy from a branch → `main` / root. Espera a que `https://elangelsp.github.io/googleXXXXXXXX.html`
   cargue y pulsa **Verificar**.

## 3. Google Auth Platform → Información de marca (Branding)
https://console.cloud.google.com/auth/branding (elige el proyecto de AutoContent Studio)
1. **Nombre de la aplicación:** `AutoContent Studio`.
2. **Correo de asistencia al usuario:** `rataxd24@gmail.com`.
3. **Logotipo:** déjalo vacío. En una app externa en producción, subir un logotipo obliga a pasar la verificación de
   marca antes de mostrarlo.
4. **Dominio de la aplicación:** página principal, política de privacidad y condiciones del servicio (tabla del apartado 0).
5. **Dominios autorizados:** añade `elangelsp.github.io`. Google pide añadir los dominios autorizados antes que las URLs que
   los usan; si te da error, añade primero el dominio, guarda y después las URLs.
6. **Información de contacto del desarrollador:** `rataxd24@gmail.com`. Guarda.

Errores posibles y qué significan:
- «Invalid domain: must be a top private domain» o «Domain not found»: Google no acepta el dominio así. Prueba la opción B
  del apartado 2; si sigue fallando, mira el apartado 6.
- «Your branding is not shown to users»: normal hasta que Google verifique la marca; no impide usar la aplicación.

## 4. Google Auth Platform → Público (Audience)
https://console.cloud.google.com/auth/audience
1. **Tipo de usuario:** Externo.
2. **Estado de publicación:** pulsa **Publicar aplicación** para pasar a «En producción». En «Prueba», los tokens de
   actualización caducan a los 7 días y AutoContent Studio tendría que reconectarse cada semana.
3. Sin verificar, Google muestra el aviso «Google no ha verificado esta aplicación» al conectar; el titular puede seguir
   (Configuración avanzada → Ir a AutoContent Studio). Google contempla exenciones de verificación para aplicaciones de uso
   personal; AutoContent Studio solo la usa su titular.
4. **Acceso a datos (Data Access):** deben figurar exactamente los dos permisos que pide la aplicación y que describe la
   política: `.../auth/youtube.upload` y `.../auth/youtube.readonly`. No añadas otros.

## 5. Comprobaciones antes de pedir cualquier verificación
- [ ] Las tres URLs cargan sin iniciar sesión y por HTTPS.
- [ ] La página principal enlaza la misma política de privacidad que el consentimiento.
- [ ] El nombre de la aplicación es idéntico en Google Cloud y en la web («AutoContent Studio»).
- [ ] La propiedad de Search Console está verificada con una cuenta Owner/Editor del proyecto.
- [ ] Los datos del titular están completos en `site.config.json` (ahora mismo falta el nombre).
- [ ] AutoContent Studio cumple los puntos del apartado 7.

## 6. Si Google rechaza `github.io`: alternativas gratuitas
| Opción | Coste | Estado |
|---|---|---|
| Raíz `elangelsp.github.io` (opción B) | gratis | pendiente de probar con tu cuenta |
| Subdominio de otros alojamientos (Cloudflare Pages `*.pages.dev`, Netlify `*.netlify.app`, Vercel `*.vercel.app`) | gratis | mismo problema que `github.io`: son sufijos públicos compartidos; no aporta nada |
| Dominio gratuito con DNS propio (por ejemplo `factorinedito.eu.org`), apuntado a GitHub Pages con dominio personalizado | gratis | permite una propiedad «Dominio» por DNS; la solicitud se aprueba a mano y puede tardar semanas; no comprobado si Google lo acepta |
| Dominio propio de pago | de pago | descartado por el requisito de coste cero |

## 7. Lo que AutoContent Studio aún debe cambiar para cumplir la política de YouTube
Detectado al auditar el código (repositorio privado; no se ha modificado sin tu autorización):
1. **Revocar el token al desconectar.** Ahora «Desconectar YouTube» renombra el archivo de tokens a `.bak` y no avisa a
   Google. La política de YouTube (III.D.2) exige revocar el token por programa en ese momento y borrar los datos
   autorizados en 7 días. Cambio propuesto: llamar a `https://oauth2.googleapis.com/revoke` y borrar el archivo.
2. **Datos de más de 30 días.** Las estadísticas (visualizaciones, «me gusta», comentarios) pueden conservarse, pero hay que
   confirmar cada 30 días que la autorización sigue vigente y que el vídeo existe. El resto de datos autorizados (estado y
   procesamiento guardados en cada lectura, nombre del canal) no pueden guardarse más de 30 días sin refrescarse.
   Cambio propuesto: tarea diaria que borre esas instantáneas antiguas y vuelva a comprobar la autorización.
3. **Borrado a petición en 7 días** (III.E.4.g): la política publicada lo promete; hace falta un comando que lo haga.
Cuando estén hechos, actualiza los apartados 8 y 11 de la política de privacidad y la fecha de `lastLegalUpdate`.

## Documentación consultada
- Gestionar la marca de la aplicación OAuth: https://support.google.com/cloud/answer/15549049
- Requisitos de verificación: https://support.google.com/cloud/answer/13464321
- Verificación de marca: https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification
- Política de datos de usuario de las API de Google: https://developers.google.com/terms/api-services-user-data-policy
- Políticas para desarrolladores de YouTube: https://developers.google.com/youtube/terms/developer-policies
- Verificar la propiedad en Search Console: https://support.google.com/webmasters/answer/9008080
