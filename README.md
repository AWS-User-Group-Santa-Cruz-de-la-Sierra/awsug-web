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

Las redes (del grupo y de cada líder) solo aparecen si tienen un link cargado. Si cambias `src/content.config.ts`, reinicia `npm run dev` para que tome el esquema nuevo.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Eventos (un archivo por evento) | `src/content/eventos/*.md` |
| Fotos de eventos y speakers | `assets/events/` |
| Líderes | `src/data/lideres.json` + fotos en `assets/members/` (el campo `encuadre` ajusta la foto en el círculo: `x`, `y` es el punto que queda fijo, en %, y `zoom` acerca; 1 = foto completa) |
| Merch | `src/data/merch.json` + fotos en `assets/merch/` |
| Redes del grupo, link de Meetup, logo | `src/data/sitio.json` + logo en `assets/logos/` |
| Imagen para compartir por defecto | `public/og.png` |

## Mantenimiento con Claude

En `.claude/skills/` hay skills listas para las tareas de siempre. Con Claude Code abierto en esta carpeta basta con pasarle los datos:

- **Agregar un evento**: pega el JSON de Meetup del evento y pide "agrega este evento" (skill `agregar-evento`).
- **Después de un evento**: pide "ya pasó la Game Night, ciérrala" y pasa las fotos si las tienes (skill `cerrar-evento`).
- **Publicar**: pide "publica el sitio" (skill `publicar-sitio`).

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

## Publicar en S3 + CloudFront

La infraestructura está en `infra/` como app de AWS CDK en Python (stack `awsug-web`, región `us-east-1`): bucket S3 privado, CloudFront con OAC, una función que resuelve `/ruta/` → `/ruta/index.html`, el certificado ACM y los registros de `awsug.scz.net` en Route 53. El dominio y la zona están en `infra/cdk.json`.

`infra/` es un respaldo de cómo está armada la infraestructura: no se despliega desde GitHub Actions. Si hay que recrearla o cambiarla, se hace a mano (requiere Python 3.10+):

```bash
cd infra
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
npx aws-cdk@2.1147.0 bootstrap   # solo la primera vez en la cuenta/región
npx aws-cdk@2.1147.0 deploy awsug-web
```

### Publicación automática (GitHub Actions)

`.github/workflows/publicar.yml` construye cada PR y publica en `awsug.scz.net`:

- en cada push a `main`;
- todos los días a las 06:00 (hora de Bolivia), para que los eventos que ya terminaron pasen a "pasados";
- a mano, desde la pestaña **Actions** → *Publicar sitio* → *Run workflow*.

Entra a AWS por OIDC con un rol que solo puede subir al bucket e invalidar CloudFront; no hay llaves guardadas en el repo.

## Diseño

- Contexto del producto: `PRODUCT.md`
- Sistema visual: `DESIGN.md`
