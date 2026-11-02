# Instrucciones para Claude: sitio del AWS UG Santa Cruz

Sitio estático en Astro 7 que se publica en S3. El contenido vive en archivos de datos; casi nunca hace falta tocar componentes para actualizarlo.

## Skills del repo

Las tareas de mantenimiento están escritas como skills en `.claude/skills/`. Úsalas en vez de improvisar:

- `agregar-evento`: el maintainer pasa el JSON de Meetup (pegado o como archivo) o los datos de un evento nuevo.
- `cerrar-evento`: un evento ya ocurrió; pasa de próximo a pasado, con su link, fotos, grabación o slides.
- `publicar-sitio`: build y subida a S3, solo si lo piden.

## Tareas frecuentes

**Agregar un evento**
1. Pide al usuario (si no los dio): título, resumen corto, tipo (meetup | workshop | evento), fecha, hora (y hora de fin), lugar con link de mapa, speakers, links de inscripción (Meetup, AWS Builder) y la foto de portada.
2. Copia la portada a `assets/events/` con un nombre en minúsculas, sin espacios ni tildes.
3. Crea `src/content/eventos/AAAA-MM-DD-slug.md` siguiendo el esquema de `src/content.config.ts` (hay un ejemplo completo en `README.md`). La descripción larga va en el cuerpo del Markdown.
4. Corre `npm run build` y confirma que pasa. El esquema valida fechas, horas y URLs.

**Importar desde Meetup:** `node scripts/importar-meetup.mjs assets/events/<export>.json` (con `MEETUP_OFFSET` para páginas siguientes). Luego revisa tipo, speakers (leerlos del afiche si hace falta) y escribe un `resumen` corto con el contenido del evento, no con la logística.

**Después de que un evento ocurre:** agrega sus fotos en `galeria` (archivos en `assets/events/`) y vuelve a publicar. Los eventos pasan de "próximos" a "pasados" según la fecha del build.

**Líderes, merch, redes:** edita `src/data/lideres.json`, `src/data/merch.json` y `src/data/sitio.json`. Una URL vacía (`""`) oculta ese link en producción.

**Publicar:** `npm run build && aws s3 sync dist/ s3://<bucket> --delete` (solo cuando el usuario lo pida).

## Reglas

- No inventes datos: fechas, speakers, títulos de líderes, cifras o links que el usuario no dio quedan vacíos o se preguntan.
- Las imágenes viven en `assets/` en la raíz (`events`, `members`, `logos`, `merch`) y se referencian por nombre de archivo, sin espacios.
- Si un evento no tiene `portada`, se dibuja un arte con su tipo y número; los afiches de Meetup se muestran en su proporción original.
- Todo el texto del sitio va en español.
- Para cambios de diseño, sigue `DESIGN.md` y el contrato en `.impeccable/surfaces/`. El violeta pleno (#8900F2) se reserva para lo activo: inscribirse y unirse.
