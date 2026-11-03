// @ts-check
import { defineConfig } from 'astro/config';
import remarkBreaks from 'remark-breaks';

// URL pública del sitio. Se usa para los links canónicos y las vistas previas al compartir.
// Para probar con otra URL (por ejemplo el endpoint del bucket): SITE_URL=... npm run build
const site = process.env.SITE_URL ?? 'https://awsug.scz.net';

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
