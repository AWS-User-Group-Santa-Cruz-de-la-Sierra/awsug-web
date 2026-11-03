---
name: publicar-sitio
description: Publica el sitio del AWS UG Santa Cruz en awsug.scz.net lanzando el workflow de GitHub Actions. Úsala solo cuando el maintainer pida explícitamente publicar, subir, desplegar o "deployar" el sitio, por ejemplo después de agregar o cerrar un evento.
---

# Publicar el sitio

Publicar cambia lo que ve todo el público, así que **hazlo solo si el maintainer lo pidió en este pedido**. Tener los cambios listos no es permiso para publicar.

La publicación la hace siempre GitHub Actions (`.github/workflows/publicar.yml`): build, subida a S3 e invalidación de CloudFront. No subas archivos al bucket a mano.

## 1. Antes de publicar

- Corre `npm run build` localmente. Si falla, arregla el error antes de seguir.
- El workflow publica lo que está en `main` de GitHub. Los cambios tienen que estar commiteados y en `main`; si no lo están, pregúntale al maintainer si los commiteas y haces push (o si abre un PR). Un push a `main` ya publica solo: no hace falta el paso 2.
- Revisa que `gh auth status` funcione. Si no, pídele al maintainer `! gh auth login` y no sigas.

## 2. Lanzar el workflow (si no hubo push)

```bash
gh workflow run publicar.yml --ref main
gh run list --workflow publicar.yml --limit 1
gh run watch <run-id> --exit-status
```

Si falla, muestra el paso que falló con `gh run view <run-id> --log-failed` y explica el error.

## 3. Confirmar

Abre `https://awsug.scz.net/` y revisa que:
- la landing muestre el próximo evento correcto o el estado vacío;
- `/events/` liste los eventos nuevos o cerrados.

Informa qué commit se publicó y el link del run.
