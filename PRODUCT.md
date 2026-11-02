# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Astro con salida 100% estática (`npm run build` → `dist/` → `aws s3 sync`). El usuario preguntó qué convenía para S3; se eligió Astro sobre HTML plano porque da una página propia por evento con vista previa al compartir en Instagram/WhatsApp, valida los datos de cada evento al hacer el build y optimiza las fotos. Sin servidor ni base de datos.

## Users

Estudiante (también profesionales y entusiastas de AWS) que descubre al grupo por un post en Instagram o TikTok y llega desde el celular o la computadora. Quiere entender quiénes son, cuándo es el próximo encuentro y cómo inscribirse.

## Product Purpose

Perfil oficial del AWS User Group Santa Cruz de la Sierra: el lugar donde se centraliza toda la información del grupo (quiénes somos, qué hacemos, eventos próximos y pasados, merch, liderazgo y redes). Éxito: quien llega desde redes entiende qué es la comunidad y se inscribe al próximo evento o sigue al grupo.

## Positioning

Es la comunidad AWS de Santa Cruz de la Sierra, Bolivia: local, cercana y alegre. Lema confirmado: "La comunidad del entusiasmo, La comunidad de las risas, La comunidad de Santa Cruz de la Sierra".

## Operating Context

- Los eventos se difunden en Instagram y TikTok; la inscripción se hace en formularios externos de Meetup y AWS Builder.
- Hosting: bucket de Amazon S3 (sitio estático). Código en GitHub.
- Las actualizaciones (sobre todo agregar eventos) las hará Claude en el futuro, así que agregar un evento debe requerir tocar un solo archivo de datos y sus fotos.

## Capabilities and Constraints

- Rutas: `/` (landing) y `/events` (eventos próximos y pasados). La landing muestra un adelanto del próximo evento que lleva a `/events`.
- Secciones aprobadas de la landing, en orden: Hub (lema + CTA + redes), Quiénes somos y Qué hacemos, Agenda (adelanto del próximo evento), Hitos (eventos pasados), Liderazgo, Merch, pie con redes.
- Cada evento: foto de portada, título, descripción, speakers, fecha, hora, link del lugar (mapa) y links generales (inscripción en Meetup, AWS Builder).
- Liderazgo actual: Afu Tse, Rodolfo Justiniano, Isaac Jaldin; cada uno con nombre, título, LinkedIn, Instagram, perfil de AWS Skill Builder y TikTok.
- Redes del grupo: Instagram, TikTok, X, LinkedIn.
- Qué hacemos (confirmado): meetups con charlas, workshops hands-on, eventos grandes.
- Idioma: español.

## Brand Commitments

- Colores del grupo: #8900F2 (violeta) y #0B132B (azul noche). Guiños permitidos al verde y blanco de Santa Cruz de la Sierra y al naranja AWS #F35B04.
- Tema oscuro, con más movimiento que awsugperu.cloud (referencia que le gusta al usuario por su estilo oscuro y sus secciones Hub, Agenda, Hitos, Liderazgo), sin parecer una copia.
- "Santa Cruz de la Sierra" dentro del lema lleva un efecto verde-blanco-plateado.
- Paleta elegida en brainstorming (opción C): violeta como color principal, verde cruceño como segundo color, naranja AWS mínimo. Neón moderado.

## Evidence on Hand

- Pendiente: carpeta `assets/` que el usuario va a crear con logos de la comunidad, merch, fotos de eventos pasados y futuros, y fotos de los líderes.
- No existen todavía en el proyecto: títulos de los líderes, URLs de redes (grupo y líderes), datos concretos de eventos, textos de quiénes somos. No se inventan; se dejan como placeholders claramente marcados para reemplazar.

## Product Principles

1. Un solo lugar: todo lo que alguien que viene de redes necesita para unirse está aquí, sin depender de otra página.
2. Agregar un evento es agregar un archivo: el contenido vive en datos, no en el diseño.
3. Local y alegre antes que corporativo: se siente como Santa Cruz y como la gente del grupo.
4. El celular manda, sin descuidar la computadora.
