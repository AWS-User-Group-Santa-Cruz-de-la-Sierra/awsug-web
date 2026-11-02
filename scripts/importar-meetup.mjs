#!/usr/bin/env node
/**
 * Importa eventos desde una exportación JSON de Meetup (respuesta GraphQL de la página de eventos del grupo).
 *
 * Uso:
 *   node scripts/importar-meetup.mjs assets/events/<archivo>.json [--sin-fotos] [--sobrescribir]
 *
 * Los eventos se numeran solos por fecha en el sitio; el importador no fija números salvo MEETUP_NUMERO_MAX.
 *
 * Por cada evento:
 *   - crea src/content/eventos/<fecha>-<titulo>.md (si ya existe lo deja como está, salvo --sobrescribir)
 *   - descarga la foto destacada a assets/events/<mismo-nombre>.jpeg
 *
 * Solo guarda datos públicos del evento. Los nombres de quienes se anotaron NO se copian.
 * Revisa luego a mano: tipo de evento, speakers y links de inscripción.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const archivo = args.find((a) => !a.startsWith('--'));
const sinFotos = args.includes('--sin-fotos');
const sobrescribir = args.includes('--sobrescribir');

if (!archivo) {
  console.error('Uso: node scripts/importar-meetup.mjs assets/events/<archivo>.json [--sin-fotos] [--sobrescribir]');
  process.exit(1);
}

const DIR_EVENTOS = 'src/content/eventos';
const DIR_FOTOS = 'assets/events';

/**
 * Lee el JSON tolerando saltos de línea o tabulaciones sin escapar dentro de los textos,
 * que aparecen al copiar la respuesta desde las herramientas del navegador.
 */
function leerJson(texto) {
  try {
    return JSON.parse(texto);
  } catch {
    let salida = '';
    let enTexto = false;
    let escapado = false;
    for (const c of texto) {
      if (enTexto) {
        if (escapado) escapado = false;
        else if (c === '\\') escapado = true;
        else if (c === '"') enTexto = false;
        else if (c < ' ') {
          salida += c === '\n' ? '\\n' : c === '\r' ? '\\r' : c === '\t' ? '\\t' : '';
          continue;
        }
      } else if (c === '"') enTexto = true;
      salida += c;
    }
    return JSON.parse(salida);
  }
}

const datos = leerJson(fs.readFileSync(archivo, 'utf8'));
const conexion = datos?.data?.groupByUrlname?.events;
if (!conexion?.edges) {
  console.error('No encontré data.groupByUrlname.events.edges en el JSON. ¿Es la respuesta de la página de eventos de Meetup?');
  process.exit(1);
}

// Por defecto los eventos se numeran solos por orden de fecha en el sitio (SCZ·001 = el primero).
// Solo si hace falta fijar números a mano: MEETUP_NUMERO_MAX=<número del evento más reciente del archivo>.
const numeroMax = process.env.MEETUP_NUMERO_MAX ? Number(process.env.MEETUP_NUMERO_MAX) : undefined;

const sinEmojis = (s) =>
  s
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\p{Regional_Indicator}/gu, '')
    .replace(/[️‍]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const limpiarTitulo = (s) => sinEmojis(s).replace(/\s*\|\s*/g, ' · ').replace(/^[·\s-]+|[·\s-]+$/g, '');

const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '');

function resumenDe(descripcion, titulo) {
  // primer párrafo de texto corrido: se saltan títulos, listas y líneas muy cortas
  const parrafos = descripcion
    .split(/\n\s*\n/)
    .map((p) =>
      sinEmojis(
        p
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/\\([|*_#\\-])/g, '$1')
          .replace(/[*_`>]/g, '')
          .replace(/\n/g, ' '),
      ),
    );
  const texto = parrafos.find((p) => p.length >= 40 && !/^#/.test(p) && !/^[-•]/.test(p)) ?? '';
  const base = texto.length >= 10 ? texto : titulo;
  if (base.length <= 200) return base;
  const corte = base.slice(0, 200);
  return `${corte.slice(0, corte.lastIndexOf(' '))}…`;
}

function tipoDe(titulo) {
  const t = titulo.toLowerCase();
  if (/taller|workshop|hands-on/.test(t)) return 'workshop';
  if (/road to/.test(t)) return 'meetup';
  if (/campus|community day|summit|student/.test(t)) return 'evento';
  return 'meetup';
}

const modalidadDe = (tipo) => ({ ONLINE: 'en-linea', HYBRID: 'hibrido' })[tipo] ?? 'presencial';

const yaml = (s) => JSON.stringify(s); // JSON es YAML válido para strings

async function descargar(url, destino) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const tipo = r.headers.get('content-type') ?? '';
  if (!tipo.startsWith('image/')) throw new Error(`no es una imagen (${tipo})`);
  fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
}

fs.mkdirSync(DIR_EVENTOS, { recursive: true });
fs.mkdirSync(DIR_FOTOS, { recursive: true });

let creados = 0;
for (const [i, { node: e }] of conexion.edges.entries()) {
  const titulo = limpiarTitulo(e.title);
  const fecha = e.dateTime.slice(0, 10);
  const nombre = `${fecha}-${slug(titulo)}`;
  const md = path.join(DIR_EVENTOS, `${nombre}.md`);

  if (fs.existsSync(md) && !sobrescribir) {
    console.log(`= ya existe ${md}`);
    continue;
  }

  const foto = (e.featuredEventPhoto ?? e.displayPhoto)?.highResUrl;
  let portada;
  if (foto && !sinFotos) {
    const destino = path.join(DIR_FOTOS, `${nombre}.jpeg`);
    try {
      if (!fs.existsSync(destino)) await descargar(foto, destino);
      portada = path.basename(destino);
    } catch (err) {
      console.warn(`! no pude descargar la portada de "${titulo}": ${err.message}`);
    }
  }

  const v = e.venue;
  const lugarVirtual = !v || /online|virtual/i.test(v.name ?? '');
  const modalidad = lugarVirtual && e.eventType !== 'HYBRID' ? 'en-linea' : modalidadDe(e.eventType);
  const enLinea = modalidad === 'en-linea' || lugarVirtual;
  const direccion = enLinea ? undefined : [v.address, v.city].filter(Boolean).join(', ');
  const mapa = enLinea
    ? undefined
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([v.name, v.address, v.city].filter(Boolean).join(', '))}`;

  const lineas = [
    '---',
    `titulo: ${yaml(titulo)}`,
    `resumen: ${yaml(resumenDe(e.description ?? '', titulo))}`,
    `tipo: ${tipoDe(titulo)}`,
    `modalidad: ${modalidad}`,
    numeroMax ? `numero: ${numeroMax - i}` : null,
    e.going?.totalCount != null ? `inscritos: ${e.going.totalCount}` : null,
    `fecha: ${yaml(fecha)}`,
    `hora: ${yaml(e.dateTime.slice(11, 16))}`,
    e.endTime ? `horaFin: ${yaml(e.endTime.slice(11, 16))}` : null,
    portada ? `portada: ${yaml(portada)}` : null,
    portada ? `portadaAlt: ${yaml(`Afiche de ${titulo}`)}` : null,
    'lugar:',
    `  nombre: ${yaml(enLinea ? 'En línea' : v.name)}`,
    direccion ? `  direccion: ${yaml(direccion)}` : null,
    mapa ? `  mapa: ${yaml(mapa)}` : null,
    'speakers: []',
    'links:',
    `  - etiqueta: ${yaml(e.status === 'PAST' ? 'Ver en Meetup' : 'Inscribirme en Meetup')}`,
    `    url: ${yaml(e.eventUrl)}`,
    '    tipo: meetup',
    '---',
    '',
    (e.description ?? '').trim(),
    '',
  ].filter((l) => l !== null);

  fs.writeFileSync(md, lineas.join('\n'));
  creados++;
  console.log(`+ ${md}${portada ? ` (portada ${portada})` : ''}`);
}

console.log(`\n${creados} evento(s) creados de ${conexion.edges.length} en el archivo.`);
if (conexion.pageInfo?.hasNextPage) {
  console.log('Ojo: Meetup indica que hay más eventos. Exporta la página siguiente y vuelve a correr el script con ese archivo.');
}
