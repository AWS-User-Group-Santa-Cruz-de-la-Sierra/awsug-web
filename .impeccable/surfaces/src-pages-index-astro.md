---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/events/index.astro","src/pages/events/[slug].astro"]
---

# Landing y eventos: AWS UG Santa Cruz

## Scope
- Superficies: `/` (landing), `/events/` (próximos y pasados) y `/events/<slug>/` (detalle compartible). Modo: Persuade.
- Público: estudiante que llega desde Instagram o TikTok, en celular o computadora.
- Acción principal: inscribirse al próximo evento (Meetup o AWS Builder). Acción secundaria: seguir al grupo en redes.
- Contenido real: nombres de los líderes, lema y actividades confirmadas. Fotos, logos y merch llegan en `src/assets/`. Los eventos de ejemplo van marcados como ejemplo.

## Direction contract

THESIS: La landing es la tapa de la laptop del grupo, y cada evento vivido deja un sticker pegado en ella. Rechaza la landing tech de siempre: degradado detrás de un título centrado y una fila de tarjetas iguales.

OWN-WORLD: Aluminio anodizado azul noche (#0B132B a #070D1F) con un cepillado fino. Encima van stickers de vinilo troquelado con borde blanco #F4F6FB y sombra corta y neutra. El violeta #8900F2 pleno se usa solo en lo activo: el próximo evento y el CTA principal. El segundo color es el verde cruceño #00A651/#3DFFA2 con plata #C0C7D0, y el naranja AWS #F35B04 aparece en un solo sticker. Tipografía: display ancha y pesada (Anybody), cuerpo en Hanken Grotesk y números de serie en Martian Mono (SCZ·012).

STORY: En un vistazo se entiende quiénes son, que hay un evento pronto y cómo inscribirse. Al bajar aparecen qué hacen, la historia en stickers, quiénes organizan y el merch, y la página cierra con las redes.

FIRST VIEWPORT: Arriba, el nav con anclas y el botón Eventos. A la izquierda, cerca del 55% del ancho, el lema grande: "La comunidad" fijo y su final rotando, con "Santa Cruz de la Sierra" en verde, blanco y plata; debajo, "Únete en Meetup" en violeta y "Ver eventos" con contorno verde. A la derecha, los stickers caen en diagonal y el mayor, blanco, es el próximo evento con su botón Inscribirme. En celular, el lema va arriba y el sticker del evento debajo.

FORM: Tapa de laptop con stickers, candidato 3 de 7. seed:831932fecadc46da. Interacción distintiva: los stickers caen con física de vinilo (peso y un rebote corto), todos movidos por un mismo orquestador de scroll, y la esquina se despega bajo el cursor.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Raises kept from declined challengers
- Del mapa de orientación: el violeta pleno queda reservado para lo activo.
- Del autómata de papel: un solo hilo de movimiento para toda la página.
- De la cubeta de tinta: el movimiento obedece la física del vinilo.
- De la terminal de nave: numeración de serie honesta para cada evento.
- Del pliegue curvo: una sola diagonal ordena dónde caen los stickers.

## Unresolved
- URLs de redes del grupo y de los líderes, títulos de los líderes, textos de quiénes somos y datos reales de los eventos.
- Merch: por ahora es una sección de la landing; puede tener página propia si crece.
