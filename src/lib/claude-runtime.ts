/* Acceso seguro a las capacidades de la página cuando se publica como artefacto de Claude.
   Fuera del artefacto `window.claude` no existe y todas las funciones devuelven null. */
type ClaudeHost = { use: (name: string) => Promise<unknown> };

function host(): ClaudeHost | null {
  if (typeof window === 'undefined') return null;
  const c = (window as unknown as { claude?: ClaudeHost }).claude;
  return c && typeof c.use === 'function' ? c : null;
}

const cache = new Map<string, Promise<unknown>>();

/** Resuelve una capacidad (db, user, sample…) o null si no está disponible. Espera hasta 12 s a que el visor responda. */
export function useCapability<T = unknown>(name: string): Promise<T | null> {
  if (!cache.has(name)) {
    cache.set(name, (async () => {
      for (let i = 0; i < 40 && !host(); i++) await new Promise(r => setTimeout(r, 300));
      const h = host();
      if (!h) return null;
      try { return (await h.use(name)) ?? null; } catch { return null; }
    })());
  }
  return cache.get(name) as Promise<T | null>;
}
