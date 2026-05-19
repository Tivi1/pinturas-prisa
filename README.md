# Pinturas PRISA — sitio web + asistente Cody

Sitio [Next.js](https://nextjs.org) (App Router) con página de marca, categorías/productos demo y **asistente flotante** integrado con la API **Cody** vía rutas servidor (BFF).

## Requisitos

- Node.js 20+ (recomendado)
- `npm ci` o `npm install`

## Desarrollo

```bash
cp .env.example .env.local   # opcionalmente .env; no subir secretos
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

- **Servidor Cody** (`CODY_*`): URL base (`CODY_INTERNAL_API_URL` o `CODY_API_BASE_URL`), `CODY_AGENT_ID`, credenciales de servicio (`CODY_SERVICE_*` o alias `CODY_CHAT_*`), fichas PDF (`CODY_TECHNICAL_SHEETS_URLS`), etc.
- **Textos del widget en el navegador**: sólo vars con prefijo **`NEXT_PUBLIC_ASSISTANT_*`** (tras cambiarlas, reinicia `npm run dev`).
- `.env*` está en `.gitignore`; el repo lleva **`.env.example`** como plantilla.

Documentación rápida de claves opcionales dentro de ese archivo.

## Asistente y API interna

| Ruta Next | Propósito |
|-----------|-----------|
| `POST /api/cody/bootstrap` | Login + `create-chat-session` + thread inicial + cookies httpOnly |
| `POST /api/cody/chat/stream` | Streaming hacia Cody (necesita cookies de bootstrap) |
| `POST /api/cody/chat` | Fallback legacy (`getCodyAccessToken`, threads/conversaciones según env) |

UI: `src/components/floating-assistant/` (dinámico vía `FloatingAssistantGate` en `src/app/layout.tsx`).

## Proyecto mínimo solo widget

La carpeta **`standalone-widget/`** es un segundo `package.json` con la misma pieza UI + rutas Cody mínimas, útil como demo o base para pegar el widget en otro sitio:

```bash
cd standalone-widget
cp .env.example .env.local
npm install && npm run dev
```

## Scripts

```bash
npm run dev      # desarrollo (Turbopack)
npm run build    # compilación producción
npm run start    # servidor producción tras build
npm run lint     # ESLint
```

## Estructura destacada

- `src/app/` — páginas, layout, API routes Cody
- `src/lib/cody/` — env, cookies BFF, token legacy, parsing de respuestas
- `src/lib/assistant/` — contexto enviado al agente (fichas, página actual, catálogo local en el sitio principal)
- `src/presentation/`, `src/domain/` — capas UI / dominio locales al sitio

## Licencia y repo

Este repositorio es privado/público según la configuración en GitHub. No incluyas valores reales de `.env` ni tokens en commits.
