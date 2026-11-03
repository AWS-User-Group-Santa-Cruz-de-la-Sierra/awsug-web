import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const url = z.url();
const urlOpcional = z.union([url, z.literal('')]).default('');

/**
 * Eventos: un archivo Markdown por evento en src/content/eventos/.
 * El nombre del archivo es la URL: 2026-11-15-meetup.md → /events/2026-11-15-meetup/
 * El cuerpo del Markdown es la descripción completa del evento.
 */
const eventos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/eventos' }),
  schema: z.object({
    titulo: z.string().min(3),
    /** Una o dos frases. Se usa en tarjetas y al compartir el link. */
    resumen: z.string().min(10).max(220),
    tipo: z.enum(['meetup', 'workshop', 'evento']).default('meetup'),
    modalidad: z.enum(['presencial', 'en-linea', 'hibrido']).default('presencial'),
    /** Número del evento en la historia del grupo (SCZ·025). Si falta, se calcula por orden de fecha. */
    numero: z.number().int().positive().optional(),
    /** Personas que se anotaron en Meetup (dato de la exportación). */
    inscritos: z.number().int().nonnegative().optional(),
    /** Fecha en formato AAAA-MM-DD (hora de Bolivia). */
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Usa el formato AAAA-MM-DD, por ejemplo 2026-11-15'),
    /** Hora de inicio en formato 24 h HH:MM. */
    hora: z.string().regex(/^\d{2}:\d{2}$/, 'Usa el formato HH:MM, por ejemplo 18:30'),
    horaFin: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    /** Nombre del archivo dentro de assets/events/ (por ejemplo meetup-noviembre.jpg). */
    portada: z.string().optional(),
    portadaAlt: z.string().optional(),
    lugar: z.object({
      nombre: z.string(),
      direccion: z.string().optional(),
      /** Link de Google Maps u otro mapa. */
      mapa: url.optional(),
    }),
    speakers: z
      .array(
        z.object({
          nombre: z.string(),
          charla: z.string().optional(),
          rol: z.string().optional(),
          /** Nombre del archivo dentro de assets/events/ (opcional). */
          foto: z.string().optional(),
          linkedin: url.optional(),
        }),
      )
      .default([]),
    /** Links generales: inscripción en Meetup, AWS Builder, slides, grabación… */
    links: z
      .array(
        z.object({
          etiqueta: z.string(),
          url,
          tipo: z.enum(['meetup', 'awsbuilder', 'otro']).default('otro'),
        }),
      )
      .default([]),
    /** Fotos del evento ya realizado, dentro de assets/events/. */
    galeria: z.array(z.string()).default([]),
    /** Marca el evento como contenido de ejemplo (se muestra con una etiqueta). */
    ejemplo: z.boolean().default(false),
  }),
});

/** Líderes del grupo, en src/data/lideres.json. */
const lideres = defineCollection({
  loader: file('src/data/lideres.json'),
  schema: z.object({
    nombre: z.string(),
    titulo: z.string(),
    /** Nombre del archivo dentro de assets/members/ (opcional). */
    foto: z.string().optional(),
    orden: z.number().default(0),
    /** Encuadre de la foto en el círculo: punto fijo x, y en % de la foto y zoom (1 = foto completa). */
    encuadre: z
      .object({ x: z.number().min(0).max(100), y: z.number().min(0).max(100), zoom: z.number().min(1).max(4) })
      .default({ x: 50, y: 50, zoom: 1 }),
    links: z.object({
      linkedin: urlOpcional,
      instagram: urlOpcional,
      /** Perfil en AWS Builder Center (builder.aws.com/community/@usuario). */
      awsbuilder: urlOpcional,
      tiktok: urlOpcional,
    }),
  }),
});

/** Merch del grupo, en src/data/merch.json. */
const merch = defineCollection({
  loader: file('src/data/merch.json'),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string().optional(),
    /** Nombre del archivo dentro de assets/merch/. */
    foto: z.string().optional(),
    orden: z.number().default(0),
  }),
});

export const collections = { eventos, lideres, merch };
