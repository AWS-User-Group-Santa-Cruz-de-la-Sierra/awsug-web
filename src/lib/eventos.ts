import { getCollection, type CollectionEntry } from 'astro:content';

/** Bolivia no usa horario de verano: siempre UTC-4. */
const ZONA = '-04:00';
const TZ = 'America/La_Paz';
const DURACION_POR_DEFECTO_MS = 3 * 60 * 60 * 1000;

export type Evento = CollectionEntry<'eventos'> & {
  inicio: Date;
  fin: Date;
  /** Número de serie según el orden cronológico: SCZ·001, SCZ·002… */
  serie: string;
  url: string;
};

let cache: Promise<{ todos: Evento[]; proximos: Evento[]; pasados: Evento[] }> | undefined;

/**
 * Todos los eventos, numerados en orden cronológico.
 * Próximo o pasado se decide al hacer el build: vuelve a publicar después de cada evento.
 */
export function obtenerEventos() {
  cache ??= cargar();
  return cache;
}

async function cargar() {
  const entradas = await getCollection('eventos');
  const todos = entradas
    .map((e) => {
      const inicio = new Date(`${e.data.fecha}T${e.data.hora}:00${ZONA}`);
      const fin = e.data.horaFin
        ? new Date(`${e.data.fecha}T${e.data.horaFin}:00${ZONA}`)
        : new Date(inicio.getTime() + DURACION_POR_DEFECTO_MS);
      return { ...e, inicio, fin, serie: '', url: `/events/${e.id}/` };
    })
    .sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

  todos.forEach((e, i) => {
    e.serie = `SCZ·${String(e.data.numero ?? i + 1).padStart(3, '0')}`;
  });

  const ahora = Date.now();
  const proximos = todos.filter((e) => e.fin.getTime() >= ahora);
  const pasados = todos.filter((e) => e.fin.getTime() < ahora).reverse();
  return { todos, proximos, pasados };
}

const fmtDia = new Intl.DateTimeFormat('es-BO', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' });
const fmtDiaCorto = new Intl.DateTimeFormat('es-BO', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' });
const fmtMesAnio = new Intl.DateTimeFormat('es-BO', { timeZone: TZ, month: 'short', year: 'numeric' });

const fmtCompacta = new Intl.DateTimeFormat('es-BO', { timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric' });

const limpiar = (s: string) => s.replace(/\./g, '');

/** "sábado 22 de noviembre" */
export const fechaLarga = (d: Date) => fmtDia.format(d);
/** "sáb 22 nov" */
export const fechaCorta = (d: Date) => limpiar(fmtDiaCorto.format(d));
/** "22 nov 2026" */
export const fechaCompacta = (d: Date) => limpiar(fmtCompacta.format(d)).replace(/ de /g, ' ');
/** "oct 2026" */
export const mesAnio = (d: Date) => limpiar(fmtMesAnio.format(d));

export function horario(e: Evento) {
  return e.data.horaFin ? `${e.data.hora} – ${e.data.horaFin}` : e.data.hora;
}

/** Ícono que marca cada tipo de evento en su arte de portada. */
export const marcaTipo: Record<Evento['data']['tipo'], string> = {
  meetup: 'mic-2-fill',
  workshop: 'terminal-box-fill',
  evento: 'team-fill',
};

export const nombreModalidad: Record<Evento['data']['modalidad'], string> = {
  presencial: 'Presencial',
  'en-linea': 'En línea',
  hibrido: 'Híbrido',
};

export const nombreTipo: Record<Evento['data']['tipo'], string> = {
  meetup: 'Meetup',
  workshop: 'Workshop',
  evento: 'Evento',
};

/** El link principal de inscripción: Meetup primero, luego AWS Builder, luego el primero que haya. */
export function linkPrincipal(e: Evento) {
  const links = e.data.links;
  return links.find((l) => l.tipo === 'meetup') ?? links.find((l) => l.tipo === 'awsbuilder') ?? links[0];
}
