# Proyecto mínimo: solo el widget + BFF Cody (bootstrap + stream + legacy chat).

## Uso

```bash
cd standalone-widget
cp .env.example .env.local
# Rellena CODY_* reales

npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000): verás una página demo y el **FAB** del asistente.

## Contenido

| Ruta Next | Rol |
|-----------|-----|
| `src/components/floating-assistant/*` | UI del widget (copia del proyecto principal). |
| `POST /api/cody/bootstrap` | Login + `create-chat-session` + crear thread + cookies. |
| `POST /api/cody/chat/stream` | Streaming Cody (necesita cookies tras bootstrap). |
| `POST /api/cody/chat` | Fallback legacy (`getCodyAccessToken` + threads/conversations según env). |

`src/lib/assistant/buildChatContext.ts` es una **variante corta**: no importa catálogos grandes de productos PRISA; el contexto se arma con fichas desde env (`CODY_TECHNICAL_SHEETS_URLS`), URL de página actual y texto genérico. Puedes ampliar `technicalSheets.ts` para mapeos `/producto/…`.

## Integrarlo en otro sitio React/Next más adelante

1. Copia `src/components/floating-assistant` y registra `<FloatingAssistantGate />` en el layout.
2. Copia rutas `src/app/api/cody/` que necesites y `src/lib/cody/` + `src/lib/assistant/`.
3. Misma configuración `.env.local` que en el proyecto grande.
