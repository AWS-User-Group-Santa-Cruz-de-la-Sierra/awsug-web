---
name: agregar-evento
description: Agrega un evento nuevo (próximo o pasado) al sitio del AWS UG Santa Cruz a partir del JSON de Meetup o de los datos que pase el maintainer. Úsala cuando digan "agrega este evento", "nuevo meetup", "este es el upcoming event", "carga este JSON de Meetup" o peguen una respuesta GraphQL de Meetup (data.groupByUrlname.events).
---

# Agregar un evento

Cada evento es un archivo Markdown en `src/content/eventos/` y su afiche vive en `assets/events/`. El importador hace casi todo; lo que queda a mano es leer el afiche y escribir un buen resumen.

## 1. Guardar el JSON

- Si el maintainer **pegó** el JSON en el chat, guárdalo como `assets/events/AAAA-MM-DD-meetup-<algo>.json`, usando la fecha de hoy y un sufijo corto como `upcoming` o `-2`. Puedes quitar `rsvps`, `socialProofInsights` y las fotos de miembros: el importador no las usa.
- Si ya está en `assets/events/`, úsalo tal cual.
- Estos JSON **no se suben a git** porque traen nombres y fotos de quienes se anotaron. El `.gitignore` ya los excluye; no lo cambies.

## 2. Importar

```bash
node scripts/importar-meetup.mjs assets/events/<archivo>.json
```

Por cada evento del archivo, el script:
- crea `src/content/eventos/<fecha>-<slug>.md` con título, fecha, hora, modalidad, lugar con link a Google Maps, link a Meetup y la descripción completa;
- descarga el afiche a `assets/events/<fecha>-<slug>.jpeg`;
- pone "Inscribirme en Meetup" si el evento no ocurrió todavía, o "Ver en Meetup" si ya pasó;
- lee JSON con saltos de línea sin escapar, que aparecen al copiar desde el navegador.

No sobrescribe eventos que ya existen. **No uses `--sobrescribir`** sobre un evento ya editado a mano: borraría los speakers y el resumen. Los números de serie (SCZ·001…) se calculan solos por fecha, así que no los pongas.

## 3. Completar a mano (obligatorio)

Abre el `.md` creado y **mira el afiche** (`assets/events/<…>.jpeg`) junto con la descripción:

1. **`speakers`**: el importador los deja vacíos. Sácalos del afiche o de la descripción, con `nombre`, `rol` (si figura) y `charla`. Si no aparecen en ningún lado, deja `speakers: []` y pregunta. **No inventes speakers.**
2. **`resumen`** (máximo 220 caracteres): reescríbelo siempre. El automático suele traer fecha y hora. Tiene que contar **de qué trata**, no la logística. Por ejemplo: "Levantamos paso a paso tu propio servidor de juegos en AWS y después lo probamos jugando Team Fortress 2 todos juntos."
3. **`tipo`**: `meetup` (charlas), `workshop` (práctico, con laptop) o `evento` (Community Day, campus, eventos grandes). El importador lo adivina por el título; corrígelo si hace falta.
4. **`modalidad`**: `presencial`, `en-linea` o `hibrido`. Revísala si el lugar dice "Virtual" o algo raro.
5. **Links extra** (Eventbrite, AWS Builder, formulario): agrégalos en `links` con `tipo: otro` o `tipo: awsbuilder`.
6. **Nombres**: a Isaac se le escribe **"Isaac Jaldin"**, aunque Meetup diga "Carlos Jaldin" o "Carlos Jaldín". Cambia también la descripción.
7. Quita emojis de bandera u otros símbolos que hayan quedado en el título.

## 4. Sin JSON

Si solo te dan los datos sueltos, crea el `.md` copiando la plantilla de la sección "Agregar un evento" de `README.md`, y pon la foto en `assets/events/` con un nombre en minúsculas, sin espacios ni tildes. El esquema está en `src/content.config.ts`. Si falta un dato obligatorio (título, fecha, hora o lugar), pregúntalo.

## 5. Verificar

```bash
npm run build
```

- El build valida fechas, horas, URLs y que la foto exista. Si falla, el mensaje dice qué falta.
- **Evento próximo**: debe aparecer en el sticker "¡Próximo!" del hero, en "Lo que viene" y en Próximos de `/events/`, con el botón **Inscribirme**.
- **Evento pasado**: debe aparecer en Hitos y en Pasados, en orden de fecha descendente.
- No muestres la cantidad de anotados (`inscritos`) en ninguna parte del sitio: el dato se guarda pero no se renderiza.

## 6. Cerrar

Cuenta al maintainer qué evento quedó, con qué número de serie, qué speakers leíste del afiche y qué datos faltan. No publiques en S3 si no te lo pidieron; para eso está la skill `publicar-sitio`.
