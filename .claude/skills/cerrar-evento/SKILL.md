---
name: cerrar-evento
description: Pasa un evento del AWS UG Santa Cruz de "próximo" a "pasado" después de que ocurrió, actualiza su link de Meetup, agrega fotos, grabación o slides, y deja el sitio listo para volver a publicar. Úsala cuando digan "ya pasó el evento", "mueve el upcoming a pasados", "cierra el evento", "agrega las fotos del meetup" o compartan el JSON de Meetup de un evento con status PAST.
---

# Cerrar un evento (de próximo a pasado)

## Cómo decide el sitio

No hay un campo "próximo" ni "pasado". Al hacer el build, `src/lib/eventos.ts` compara `fecha` + `horaFin` (hora de Bolivia, UTC-4) con la hora actual. Si `horaFin` no está, se asume que el evento dura 3 horas.

Por eso, **mover un evento a pasados es volver a hacer build y publicar después de que terminó**. No hay que mover archivos. Esta skill se ocupa de dejar todo prolijo para ese momento.

## 1. Encontrar el evento

Busca el archivo en `src/content/eventos/` por fecha o título. Confirma que la hora de fin ya pasó. Si todavía no pasó, avisa que seguirá apareciendo como próximo hasta después de `horaFin`.

## 2. Actualizar el link

En `links`, cambia la etiqueta del link de Meetup de **"Inscribirme en Meetup"** a **"Ver en Meetup"**. La URL queda igual.

```yaml
links:
  - etiqueta: "Ver en Meetup"
    url: "https://www.meetup.com/user-group-santa-cruz/events/<id>/"
    tipo: meetup
```

Si había un formulario de inscripción aparte (AWS Builder, Eventbrite, Google Forms), quítalo o renómbralo para que no invite a inscribirse a algo que ya ocurrió.

## 3. Agregar lo que dejó el evento (si lo dan)

- **Fotos**: cópialas a `assets/events/` con nombres en minúsculas, sin espacios ni tildes, por ejemplo `2026-11-06-game-night-1.jpg`. Lístalas en `galeria`:
  ```yaml
  galeria:
    - "2026-11-06-game-night-1.jpg"
    - "2026-11-06-game-night-2.jpg"
  ```
  Aparecen en la página del evento, en la sección "Fotos".
- **Grabación o slides**: agrégalas como links con `tipo: otro`, por ejemplo `etiqueta: "Ver la grabación"`.
- **Speakers**: si cambiaron respecto del anuncio, corrígelos. Sin inventar.
- Si mandan el **JSON de Meetup actualizado** (status `PAST`), úsalo para corregir datos que cambiaron, como la hora o el lugar, pero **edita a mano**. No corras el importador con `--sobrescribir`, porque borraría los speakers y el resumen.

## 4. Evento cancelado

Si el evento no se hizo, borra su `.md` y su afiche en `assets/events/`. Los números de serie se recalculan solos por fecha, así que los eventos posteriores cambian de número; avísale al maintainer.

## 5. Verificar

```bash
npm run build
npm run preview   # http://localhost:4321
```

- El evento aparece **primero** en Hitos (landing) y en Pasados (`/events/`), justo después del hueco "Aquí va el sticker de tu próximo evento".
- El hero muestra el siguiente evento próximo. Si no hay ninguno, muestra "Estamos armando la próxima fecha" con el botón para unirse en Meetup.
- En la página del evento aparece la etiqueta "Ya pasó" y el botón gris "Ver en Meetup".

## 6. Publicar

Cambiar los archivos no alcanza: hay que publicar el build nuevo. Si el maintainer lo pide, sigue la skill `publicar-sitio`.
