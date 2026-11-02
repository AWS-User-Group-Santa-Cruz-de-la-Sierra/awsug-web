import type { ImageMetadata } from 'astro';

type Imagenes = Record<string, ImageMetadata>;

// Vite exige que las opciones de import.meta.glob sean literales en cada llamada.
// `import: 'default'` entrega directamente los metadatos de cada imagen.
const carpetas: Record<string, Imagenes> = {
  events: import.meta.glob('/assets/events/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
  }),
  members: import.meta.glob('/assets/members/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
  }),
  merch: import.meta.glob('/assets/merch/*.{jpg,jpeg,png,webp,avif,svg,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
  }),
  logos: import.meta.glob('/assets/logos/*.{jpg,jpeg,png,webp,avif,svg,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
  }),
};

/**
 * Busca una imagen por nombre de archivo dentro de assets/<carpeta>/.
 * Si el nombre está vacío devuelve undefined; si no existe, el build falla con un aviso claro.
 */
export function imagen(carpeta: keyof typeof carpetas, nombre?: string): ImageMetadata | undefined {
  if (!nombre) return undefined;
  const metadatos = carpetas[carpeta][`/assets/${carpeta}/${nombre}`];
  if (!metadatos?.src) {
    throw new Error(
      `No encontré la imagen "${nombre}" en assets/${carpeta}/. Revisa el nombre del archivo (mayúsculas y extensión).`,
    );
  }
  return metadatos;
}
