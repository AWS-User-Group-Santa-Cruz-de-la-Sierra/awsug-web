// @ts-check
import { defineConfig } from 'astro/config';
import remarkBreaks from 'remark-breaks';

// URL pública del sitio (bucket S3 o dominio). Se usa para los links canónicos
// y las vistas previas al compartir. Cámbiala aquí o con la variable SITE_URL.
const site = process.env.SITE_URL ?? 'https://awsugsantacruz.example.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: {
    // /events/ → /events/index.html: S3 lo sirve como documento índice.
    format: 'directory',
  },
  markdown: {
    // las descripciones copiadas de Meetup usan saltos de línea simples
    remarkPlugins: [remarkBreaks],
  },
});
