---
name: AWS User Group Santa Cruz de la Sierra
description: La tapa de la laptop del grupo, con un sticker de vinilo por cada evento vivido.
colors:
  desk: "#03060f"
  lid: "#0b132b"
  lid-deep: "#070d1f"
  lid-raised: "#121c3c"
  lid-line: "#22305a"
  ink: "#f4f6fb"
  silver: "#c0c7d0"
  muted: "#aeb7cb"
  violet: "#8900f2"
  violet-hover: "#9a1cff"
  violet-hi: "#b14bff"
  green: "#00a651"
  green-hi: "#3dffa2"
  green-ink: "#00783b"
  orange: "#f35b04"
typography:
  display:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.1rem, 10cqi, 6rem)"
    fontWeight: 850
    lineHeight: 0.94
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2rem, 1.1rem + 3vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.35rem, 1rem + 1vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 108"
  lead:
    fontFamily: "'Hanken Grotesk Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.4vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Hanken Grotesk Variable', 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "'Hanken Grotesk Variable', 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 750
    lineHeight: 1.1
  serial:
    fontFamily: "'Martian Mono Variable', ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0.02em"
    fontFeature: "'tnum' 1"
  tag:
    fontFamily: "'Martian Mono Variable', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  tag: "0.4rem"
  flag: "0.6rem"
  menu: "1rem"
  vinyl: "1.25rem"
  vinyl-event: "1.5rem"
  lid: "clamp(22px, 2.6vw, 40px)"
  pill: "999px"
  circle: "50%"
spacing:
  die-cut: "0.3rem"
  gutter: "clamp(16px, 4vw, 64px)"
  max-width: "1320px"
  section: "clamp(3.5rem, 2.5rem + 4vw, 6.5rem)"
  section-head: "clamp(2.25rem, 1.5rem + 2.5vw, 4rem)"
components:
  button-activo:
    backgroundColor: "{colors.violet}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  button-activo-hover:
    backgroundColor: "{colors.violet-hover}"
  button-verde:
    backgroundColor: "transparent"
    textColor: "{colors.green-hi}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  button-plata:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  button-tinta:
    backgroundColor: "transparent"
    textColor: "{colors.lid}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.4rem"
    height: "3rem"
  vinyl-blanco:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.lid}"
    rounded: "{rounded.vinyl}"
  vinyl-verde:
    backgroundColor: "{colors.green}"
    textColor: "{colors.lid-deep}"
    rounded: "{rounded.vinyl}"
  vinyl-plata:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.lid-deep}"
    rounded: "{rounded.vinyl}"
  vinyl-naranja:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.lid-deep}"
    rounded: "{rounded.pill}"
  vinyl-tapa:
    backgroundColor: "{colors.lid-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.vinyl}"
  sticker-proximo:
    backgroundColor: "{colors.violet}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.85rem 0.35rem"
  tag-ejemplo:
    backgroundColor: "transparent"
    textColor: "{colors.silver}"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "0.15rem 0.5rem"
  nav:
    backgroundColor: "#0c142e"
    textColor: "{colors.silver}"
    height: "4.5rem"
  panel-datos:
    backgroundColor: "{colors.lid-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.vinyl-event}"
    padding: "1.75rem"
---

# Design System: AWS User Group Santa Cruz de la Sierra

## Overview

**Creative North Star: "La tapa de la laptop"**

Todo el sitio es un solo objeto: la tapa de una laptop de aluminio anodizado azul noche, cepillado en horizontal, apoyada sobre una mesa todavía más oscura. Encima de esa tapa la comunidad va pegando stickers de vinilo troquelado, uno por cada evento vivido, más los que la identifican (el sello del grupo, la bandera cruceña, una burbuja de "jajaja", el "hands-on"). La página no se lee como una grilla de tarjetas, sino como una superficie que se fue llenando con el tiempo: stickers girados, montados unos sobre otros, ordenados por una sola diagonal.

La densidad es generosa y el tono es local y alegre antes que corporativo. El color se gana: el aluminio y el blanco del vinilo hacen casi todo el trabajo, el verde cruceño y la plata acompañan, y el violeta pleno aparece solo donde hay algo que hacer ahora. El movimiento obedece a la física del vinilo (cae con peso, se asienta con un rebote corto, la esquina se despega bajo el cursor) y lo dirige un único orquestador para toda la página.

Rechazos confirmados: la landing tech de siempre (degradado detrás de un título centrado y una fila de tarjetas iguales), los eyebrows o kickers encima de los títulos y el texto con degradado fuera del lema.

**Key Characteristics:**
- Un solo objeto tapa (aluminio cepillado, canto biselado, esquinas redondeadas) sobre una mesa más oscura.
- Stickers de vinilo con borde troquelado blanco, giro propio y sombra corta y neutra.
- Violeta pleno reservado para lo activo; naranja AWS en un único sticker.
- Display ancha y pesada (Anybody), cuerpo en Hanken Grotesk, números de serie en Martian Mono.
- Un solo hilo de movimiento: entrada por el orquestador, contenido visible sin JS y con movimiento reducido.

## Colors

Aluminio azul noche y vinilo blanco como base, con violeta para la acción, verde cruceño y plata como segunda voz, y un toque de naranja AWS.

### Primary
- **Violeta Activo** (violet): el fondo pleno del botón activo (Inscribirme, Únete en Meetup) y de la pastilla "¡Próximo!" sobre el sticker del evento. También el fondo de la selección de texto. Al pasar el cursor sube a **Violeta Encendido** (violet-hover).
- **Violeta Neón** (violet-hi): versión clara para texto sobre la tapa (la palabra "entusiasmo" del lema) y la barra de scroll. Nunca como fondo de botón.

### Secondary
- **Verde Cruceño** (green): vinilo verde (sello del grupo, actividad Meetups, fondo del arte de portada de un meetup) y las franjas de la bandera.
- **Verde Menta** (green-hi): contorno y texto del botón secundario (Ver eventos, Eventos del nav), números de serie sobre la tapa, iconos de datos del evento, anillo de foco y caret.
- **Verde Tinta** (green-ink): iconos sobre vinilo blanco, donde el verde menta no tendría contraste.

### Tertiary
- **Naranja AWS** (orange): un solo sticker en todo el sitio, la pastilla "metamojle pariente" del hero.

### Neutral
- **Mesa** (desk): el fondo del body, visible como margen alrededor de la tapa.
- **Tapa** (lid), **Tapa Profunda** (lid-deep): el aluminio; el degradado vertical de la tapa va de un azul algo más claro a lid-deep. lid-deep es también el texto sobre vinilos de color.
- **Tapa Elevada** (lid-raised): paneles y menús que se sientan sobre la tapa (panel de datos del evento, menú móvil, vinilo "tapa" del merch vacío).
- **Canto** (lid-line): bordes finos, divisores de listas y el contorno del botón plata.
- **Vinilo Blanco** (ink): texto principal sobre la tapa, superficie del vinilo blanco y el borde troquelado de todo sticker.
- **Plata** (silver): texto secundario y leads, vinilo plata, etiqueta EJEMPLO.
- **Gris Nota** (muted): metadatos y fechas de menor jerarquía.

### Named Rules
**The Violeta Activo Rule.** El violeta pleno solo marca lo que se puede hacer ahora: inscribirse, unirse, el próximo evento. Un evento pasado usa el botón plata; nada decorativo lleva fondo violeta.

**The Un Solo Naranja Rule.** El naranja AWS aparece en exactamente un sticker. Un segundo naranja en cualquier pantalla rompe la regla.

**The Santa Cruz Gradient Rule.** "Santa Cruz de la Sierra" dentro del lema lleva un degradado animado verde, blanco y plata (pedido del usuario y sancionado); con movimiento reducido queda quieto. Es el único texto con degradado del sitio.

## Typography

**Display Font:** Anybody Variable (con Arial Narrow)
**Body Font:** Hanken Grotesk Variable (con Segoe UI)
**Label/Mono Font:** Martian Mono Variable (con ui-monospace)

**Character:** Una display ancha, pesada y apretada, estirada con font-stretch entre 108% y 125% como letras de sticker; un cuerpo humanista y cálido; un mono técnico solo para series y etiquetas.

### Hierarchy
- **Display** (850, clamp(2.1rem, 10cqi, 6rem), 0.94, ancho 118%): el lema del hero. El tamaño sigue al ancho de su columna para que "La comunidad" siempre quepa en una línea. Títulos de página grandes (eventos, detalle, cierre del pie) usan la misma familia entre 2.4rem y 6rem con ancho 115–120%.
- **Headline** (800, clamp(2rem, 1.1rem + 3vw, 3.6rem), 1, ancho 112%): títulos de sección, con text-wrap: balance.
- **Title** (800, clamp(1.35rem, 1rem + 1vw, 1.75rem), 1, ancho 108%): nombres de actividades, líderes y títulos de eventos dentro de stickers.
- **Lead** (400, clamp(1.1rem, 1rem + 0.4vw, 1.3rem), 1.6): párrafo de apoyo bajo un título, en plata, máximo 56ch.
- **Body** (400, 1.0625rem, 1.6): texto corrido, con text-wrap: pretty.
- **Serial** (Martian Mono, 0.8125rem, 0.02em, cifras tabulares): la serie de cada evento (SCZ·012), tipo y fechas.
- **Tag** (Martian Mono 600, 0.75rem, 0.04em, mayúsculas): solo la etiqueta EJEMPLO.

### Named Rules
**The Meta Abajo Rule.** La fila de metadatos de un evento (serie · tipo · EJEMPLO) va siempre debajo del título, nunca encima. No hay eyebrows ni kickers sobre ningún título.

**The Serie Honesta Rule.** Cada evento lleva su número de serie en mono con cifras tabulares; las fechas y horas usan cifras tabulares también.

## Layout

Contenedor centrado de hasta max-width con gutter fluido a cada lado, dentro de la tapa, que se separa de la mesa por un margen de clamp(6px, 1.1vw, 18px). Las secciones respiran con padding vertical fluido (section) y sus cabeceras dejan section-head antes del contenido; la cabecera es una fila flexible título + enlace con flecha, alineada abajo.

El hero es asimétrico: el lema y las acciones a la izquierda (alrededor del 55%, 1.15fr contra 1fr) y a la derecha los stickers posicionados en absoluto sobre una sola diagonal, de arriba a la derecha hacia abajo a la izquierda, con profundidad de scroll distinta por sticker. Bajo 900px pasa a una columna: lema arriba, sticker del evento debajo, los stickers chicos alrededor.

Las colecciones no son grillas de tarjetas iguales. Los hitos usan una grilla auto-fit de 14rem como esqueleto, pero cada sticker tiene su giro, su formato (cuadrado, vertical, horizontal) y un desplazamiento que lo monta sobre el borde del anterior, y la colección cierra con un hueco punteado para "tu próximo sticker". Los líderes escalonan el del medio 3rem hacia abajo en escritorio. Las listas secundarias (más eventos próximos) son filas con divisores, no tarjetas.

## Elevation & Depth

La profundidad es física y tiene dos capas. La tapa es un objeto con luz: un brillo diagonal suave, cepillado horizontal de 3px, un canto superior iluminado y uno inferior oscuro, y una sombra grande que la despega de la mesa. Los stickers viven sobre la tapa con una sombra corta y neutra aplicada como filter: drop-shadow, para que siga la silueta troquelada (círculos, pastillas, la cola de la burbuja). Al levantarse (entrada o hover) la sombra se alarga.

### Shadow Vocabulary
- **Pegado** (`filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.4)) drop-shadow(0 7px 10px rgb(0 0 0 / 0.38))`): todo sticker en reposo, incluida la pastilla "¡Próximo!".
- **Levantado** (`filter: drop-shadow(0 2px 2px rgb(0 0 0 / 0.25)) drop-shadow(0 26px 22px rgb(0 0 0 / 0.42))`): el sticker mientras cae, antes de asentarse.
- **Tapa** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.16), inset 0 0 0 1px rgb(255 255 255 / 0.06), inset 0 -2px 0 rgb(0 0 0 / 0.35), 0 40px 80px -30px rgb(0 0 0 / 0.9)`): solo el objeto tapa.
- **Menú** (`box-shadow: 0 18px 30px -12px rgb(0 0 0 / 0.6)`): el desplegable del menú móvil.

### Named Rules
**The Sombra de Silueta Rule.** Los stickers proyectan sombra con drop-shadow, no con box-shadow, para que la sombra siga el troquel. La sombra es neutra y corta; nunca de color, nunca desplazada dura.

## Shapes

Esquinas generosas y redondeadas en todo, como vinilo cortado a troquel. El vinilo estándar redondea 1.25rem y siempre tiene un borde blanco del mismo color que la superficie blanca (die-cut, 0.3rem; más grueso en stickers grandes: 0.4–0.5rem). Hay tres formas reutilizables: rectángulo redondeado, círculo (sellos, actividades, líderes) y pastilla (botones, "hands-on", "¡Próximo!"). Los stickers de hitos varían de formato y alguno lleva esquinas asimétricas (2rem / 0.7rem) para que la tapa no parezca impresa en serie. La bandera es un rectángulo de radio chico con tres franjas verde-blanco-verde. Los botones son siempre pastilla.

## Components

### Buttons
Táctiles y redondos, como una pastilla de vinilo.
- **Shape:** pastilla completa (pill), alto mínimo 3rem, borde de 2px.
- **Activo:** fondo violeta pleno, texto blanco, peso 750. Solo para la acción activa.
- **Verde:** contorno y texto verde menta sobre transparente; en hover un velo verde al 10%. Acción secundaria (Ver eventos, links extra del evento). En el nav, con aria-current, se llena de verde menta.
- **Plata:** contorno lid-line y texto ink; en hover el contorno pasa a plata. La acción principal de un evento pasado.
- **Tinta:** contorno y texto azul noche, para botones sobre vinilo blanco.
- **Hover / Focus:** sube 2px (translate) con ease-out de 0.25s y baja 1px al presionar. Foco: anillo de 3px verde menta con offset de 3px.
- **Enlace con flecha:** texto verde menta en 700 con flecha que avanza 0.2em en hover; para "Toda la agenda", "Detalles", "Abrir en el mapa".

### Stickers (componente firma)
Cada sticker son dos capas: un contenedor externo que lleva el giro (variable --r), la sombra y el movimiento, y dentro el vinilo, que lleva la superficie, el borde troquelado blanco y, opcionalmente, la esquina despegable.
- **Vinilos:** blanco (eventos, merch, fotos), verde, plata, tapa (lid-raised), naranja (solo la pastilla "metamojle pariente") y bandera. Un vinilo holográfico de borde tornasol aparece cada cinco hitos.
- **Giro:** entre -12° y 9°, distinto por sticker.
- **Esquina despegable:** en hover o foco (y al tocar en táctil, 900ms) la esquina inferior derecha se levanta 2.1rem con un reverso plateado.
- **Entrada:** solo a través del orquestador. Cae desde 2.4rem arriba, girado 9° más y escalado 1.12 con sombra levantada; al 58% pasa el punto de reposo (0.25rem abajo, -1.2°) y se asienta en 0.7s. Los stickers sueltos se escalonan 110ms dentro de su grupo; los de una pista (hitos) se pegan uno a uno según avanza el scroll; los del hero se desplazan con profundidad distinta al hacer scroll.
- **Sin JS o con movimiento reducido:** todo está pegado y visible desde el inicio.

### Sticker de evento próximo
El sticker blanco más grande del hero. Título del evento arriba, fila de meta (serie · tipo · EJEMPLO) debajo, fecha y lugar con iconos verde tinta, y el botón activo Inscribirme. Una pastilla violeta "¡Próximo!" con borde blanco se pega encima de la esquina superior izquierda, girada -6°, como un sticker sobre el sticker. Sin evento, dice que se está armando la próxima fecha y ofrece el botón tinta.

### Arte de portada
Cuando un evento no tiene foto, la portada se dibuja: tipo del evento en display grande arriba, la marca del tipo girada -8° al centro y un pie mono con mini bandera, fecha y serie. El fondo depende del tipo: blanco por defecto, verde para meetup, plata para workshop.

### Chips
- **EJEMPLO:** contorno punteado de 1px en plata (en gris azulado sobre vinilo blanco), mono 600 en mayúsculas, radio de 0.4rem. Marca todo contenido de ejemplo.
- **Estado "Ya pasó":** pastilla con contorno lid-line y texto plata, en la fila de meta del detalle.

### Cards / Containers
- **Panel de datos:** lid-raised, borde de 1px lid-line, radio 1.5rem, padding 1.75rem. Etiquetas pequeñas en gris nota encima de valores en 700.
- **Ficha de evento:** foto del evento como sticker a la izquierda y la información a la derecha; una columna bajo 860px.
- **Hueco del próximo sticker:** contorno punteado de 2px en plata translúcida, girado 3°; se vuelve verde menta en hover.

### Navigation
Barra pegajosa de 4.5rem en un azul ligeramente más claro que la tapa, con un borde inferior en lid-line. Marca con el logo como sticker circular verde; anclas en plata, 600, en pastillas de 2.75rem que se aclaran en hover; botón Eventos en verde. Bajo 960px las anclas pasan a un menú desplegable redondo con panel lid-raised.

## Do's and Don'ts

### Do:
- **Do** reservar el violeta pleno (#8900F2) para la acción activa: inscribirse, unirse o el próximo evento.
- **Do** construir todo sticker como contenedor con giro, sombra y movimiento envolviendo un vinilo con superficie, borde blanco troquelado y esquina despegable opcional.
- **Do** dejar que la entrada de un sticker nueva la dispare solo el orquestador, y que el contenido se vea completo sin JS y con movimiento reducido.
- **Do** poner la fila de meta (serie · tipo · EJEMPLO) debajo del título del evento.
- **Do** marcar el contenido de ejemplo con la etiqueta EJEMPLO de contorno punteado plateado.
- **Do** usar el arte de portada cuando un evento no tiene foto.
- **Do** dar a cada sticker su propio giro y, en colecciones, su propio formato y desplazamiento.

### Don't:
- **Don't** usar el naranja AWS (#F35B04) en más de un sticker.
- **Don't** usar texto con degradado fuera de "Santa Cruz de la Sierra" en el lema.
- **Don't** poner eyebrows o kickers encima de los títulos.
- **Don't** estructurar una sección como una grilla de tarjetas iguales.
- **Don't** hacer la landing tech de siempre: degradado detrás de un título centrado y una fila de tarjetas iguales.
- **Don't** usar box-shadow, sombras de color o sombras desplazadas duras en los stickers.
