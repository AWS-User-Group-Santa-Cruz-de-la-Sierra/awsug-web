import { z } from 'astro/zod';
import datos from '../data/sitio.json';

const urlOpcional = z.union([z.url(), z.literal('')]).default('');

const esquema = z.object({
  nombre: z.string(),
  nombreCorto: z.string(),
  ciudad: z.string(),
  descripcion: z.string(),
  /** Nombre del archivo dentro de assets/logos/ (opcional). */
  logo: z.string().default(''),
  /** Página del grupo en Meetup. */
  meetup: urlOpcional,
  redes: z.object({
    instagram: urlOpcional,
    tiktok: urlOpcional,
    youtube: urlOpcional,
    linkedin: urlOpcional,
    /** Link de invitación al grupo de WhatsApp. */
    whatsapp: urlOpcional,
    x: urlOpcional,
  }),
});

/** Datos generales del grupo (src/data/sitio.json), validados al hacer el build. */
export const sitio = esquema.parse(datos);

export const redes = [
  { clave: 'instagram', nombre: 'Instagram', icono: 'instagram-line', url: sitio.redes.instagram },
  { clave: 'tiktok', nombre: 'TikTok', icono: 'tiktok-fill', url: sitio.redes.tiktok },
  { clave: 'youtube', nombre: 'YouTube', icono: 'youtube-fill', url: sitio.redes.youtube },
  { clave: 'linkedin', nombre: 'LinkedIn', icono: 'linkedin-box-fill', url: sitio.redes.linkedin },
  { clave: 'whatsapp', nombre: 'WhatsApp', icono: 'whatsapp-line', url: sitio.redes.whatsapp },
  { clave: 'x', nombre: 'X', icono: 'twitter-x-line', url: sitio.redes.x },
] as const;
