# AWS User Group Santa Cruz de la Sierra · sitio web

Sitio estático del AWS UG Santa Cruz de la Sierra, hecho con [Astro](https://astro.build) y pensado para alojarse en un bucket de Amazon S3.

- `/`: landing (Hub, Quiénes somos y Qué hacemos, Agenda, Hitos, Liderazgo, Merch)
- `/events/`: eventos próximos y pasados
- `/events/<evento>/`: página de cada evento, con vista previa propia al compartir el link

## Requisitos

- Node.js 20 o superior
- AWS CLI configurado (solo para publicar)

```bash
npm install
npm run dev      # http://localhost:4321 con recarga automática
npm run build    # genera el sitio en dist/
npm run preview  # sirve dist/ para revisarlo antes de publicar
```

En `npm run dev` se muestran tachados los links de redes que todavía no se cargaron. En el build de producción simplemente no aparecen.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Eventos (un archivo por evento) | `src/content/eventos/*.md` |
| Fotos de eventos y speakers | `assets/events/` |
| Líderes | `src/data/lideres.json` + fotos en `assets/members/` (el campo `encuadre` centra la cara en el círculo: `x`, `y` en % y `zoom`) |
| Merch | `src/data/merch.json` + fotos en `assets/merch/` |
| Redes del grupo, link de Meetup, logo | `src/data/sitio.json` + logo en `assets/logos/` |
| Imagen para compartir por defecto | `public/og.png` |

## Agregar un evento

1. Copia la foto de portada en `assets/events/` (por ejemplo `meetup-diciembre.jpg`).
2. Crea `src/content/eventos/2026-12-06-meetup-diciembre.md`. El nombre del archivo será la URL del evento.
3. Rellena el encabezado:

```markdown
---
titulo: "Serverless sin miedo"
resumen: "Una o dos frases que aparecen en las tarjetas y al compartir el link."
tipo: meetup            # meetup | workshop | evento
modalidad: presencial   # presencial | en-linea | hibrido
numero: 26              # número del evento en la historia del grupo (SCZ·026)
fecha: "2026-12-06"     # AAAA-MM-DD
hora: "18:30"           # HH:MM, hora de Bolivia
horaFin: "21:00"        # opcional
portada: "meetup-diciembre.jpg"
portadaAlt: "Gente en el último meetup mirando una charla"
lugar:
  nombre: "Auditorio de la universidad"
  direccion: "Av. Ejemplo 123, Santa Cruz de la Sierra"
  mapa: "https://maps.app.goo.gl/..."
speakers:
  - nombre: "Nombre Apellido"
    charla: "Título de la charla"
    linkedin: "https://www.linkedin.com/in/..."
links:
  - etiqueta: "Inscribirme en Meetup"
    url: "https://www.meetup.com/..."
    tipo: meetup
  - etiqueta: "Registrarme en AWS Builder"
    url: "https://builder.aws.com/..."
    tipo: awsbuilder
galeria: []             # fotos del evento ya realizado, en assets/events/
---

Aquí va la descripción completa del evento, en Markdown.
```

4. Ejecuta `npm run build`. Si falta un campo o una foto, el build se detiene y dice qué falta.

Cada evento muestra su número (`numero`, por ejemplo SCZ·026). Si falta, se numera por orden de fecha. Si un evento es **próximo** o **pasado** se decide al momento del build, así que publica de nuevo después de cada evento para que pase a "Hitos". Ahí también es buen momento para agregarle las fotos en `galeria`.

### Importar eventos desde Meetup

Si exportas la respuesta JSON de la página de eventos del grupo en Meetup y la guardas en `assets/events/`:

```bash
node scripts/importar-meetup.mjs assets/events/<archivo>.json
```

El script crea un `.md` por evento (sin tocar los que ya existen), descarga el afiche a `assets/events/` y numera los eventos según el total del grupo. Meetup entrega los eventos por páginas: para la página siguiente usa `MEETUP_OFFSET=10 node scripts/importar-meetup.mjs …` (sumando 10 por página). Después revisa a mano el tipo de evento, los speakers y el resumen.

Las exportaciones crudas (`assets/events/*.json`) no se suben a git porque traen los nombres de quienes se anotaron.

## Publicar en S3

1. Crea un bucket y activa **Static website hosting** con documento índice `index.html` y documento de error `404.html`.
2. Permite lectura pública (o sirve el bucket detrás de CloudFront).
3. Pon la URL pública del sitio en `astro.config.mjs` (o en la variable `SITE_URL`) para que los links al compartir sean correctos.
4. Publica:

```bash
npm run build
aws s3 sync dist/ s3://NOMBRE-DEL-BUCKET --delete
```

> **Si usas CloudFront** con el bucket como origen REST (no el endpoint de "website"), las rutas como `/events/` no cargan `index.html` solas. Usa el endpoint de website del bucket como origen, o agrega una CloudFront Function que añada `index.html` a las rutas que terminan en `/`.

## Diseño

- Contexto del producto: `PRODUCT.md`
- Sistema visual: `DESIGN.md`
