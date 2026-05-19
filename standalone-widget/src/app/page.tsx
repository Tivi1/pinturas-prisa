export default function HomePage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-bold text-[var(--color-primary)]">
        Widget standalone
      </h1>
      <p className="mt-4 text-[var(--color-text-light)]">
        Este proyecto solo incluye el asistente flotante más las rutas{" "}
        <code className="rounded bg-[var(--color-surface-alt)] px-1.5 py-0.5 text-sm">
          /api/cody/bootstrap
        </code>
        ,{" "}
        <code className="rounded bg-[var(--color-surface-alt)] px-1.5 py-0.5 text-sm">
          /api/cody/chat/stream
        </code>{" "}
        y el respaldo{" "}
        <code className="rounded bg-[var(--color-surface-alt)] px-1.5 py-0.5 text-sm">
          /api/cody/chat
        </code>
        . Copia <code>.env.example</code> a <code>.env.local</code> y ejecuta{" "}
        <code className="rounded bg-[var(--color-surface-alt)] px-1.5 py-0.5 text-sm">
          npm install && npm run dev
        </code>
        .
      </p>
    </main>
  );
}
