---
name: publicar-sitio
description: Construye y publica el sitio del AWS UG Santa Cruz en su bucket de Amazon S3. Úsala solo cuando el maintainer pida explícitamente publicar, subir, desplegar o "deployar" el sitio, por ejemplo después de agregar o cerrar un evento.
---

# Publicar el sitio en S3

Publicar cambia lo que ve todo el público, así que **hazlo solo si el maintainer lo pidió en este pedido**. Tener los cambios listos no es permiso para publicar.

## 1. Datos que necesitas

- **Nombre del bucket**: si no está en el pedido ni en `README.md`, pregúntalo. No lo adivines.
- **URL pública**: es `https://awsug.scz.net`, el valor por defecto en `astro.config.mjs`. Si el maintainer publica en otra URL, construye con `SITE_URL=<url> npm run build`; si no, los links al compartir apuntarán al dominio equivocado.
- **Credenciales de AWS**: corre `aws sts get-caller-identity`. Si falla, pide al maintainer que inicie sesión con `! aws sso login` o con su perfil, y no sigas.

## 2. Build

```bash
npm ci          # solo si node_modules no existe o cambió package-lock.json
npm run build
```

Si el build falla, arregla el error antes de seguir. Nunca publiques un `dist/` viejo.

## 3. Subir

```bash
aws s3 sync dist/ s3://<bucket> --delete
```

`--delete` borra del bucket los archivos que ya no existen en `dist/`, como un evento cancelado. Antes de correrlo, muestra al maintainer el comando con el bucket real.

Si el sitio está detrás de CloudFront, invalida la caché después de subir:

```bash
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

## 4. Confirmar

Abre la URL pública y revisa que:
- la landing muestre el próximo evento correcto o el estado vacío;
- `/events/` liste los eventos nuevos o cerrados.

Informa qué se publicó, en qué bucket y si invalidaste CloudFront.
