import { useCallback, useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "@/integrations/supabase/client";
import { useAccount } from "@/components/account-session";
import { mergeProgress, type GameProgress } from "@/lib/game-engine";

const KEY = "educalex-juego-v1";

function readLocal(): GameProgress {
  try { const raw = window.localStorage.getItem(KEY); return raw ? (JSON.parse(raw) as GameProgress) : {}; } catch { return {}; }
}
function writeLocal(p: GameProgress) {
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* almacenamiento no disponible */ }
}

/**
 * Progreso del modo juego. Siempre se guarda en el navegador; si hay sesión, también en la cuenta
 * (metadatos del usuario), de modo que se conserva entre dispositivos.
 * Nota: los metadatos los puede editar la propia persona; sirven para el progreso, no para pagos.
 */
export function useGameProgress() {
  const { user } = useAccount();
  const [progress, setProgress] = useState<GameProgress>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const local = readLocal();
    const remote = (user?.user_metadata?.["game_progress"] as GameProgress | undefined) ?? {};
    const merged = mergeProgress(local, remote);
    setProgress(merged);
    writeLocal(merged);
    setReady(true);
  }, [user]);

  const save = useCallback((next: GameProgress) => {
    setProgress(next);
    writeLocal(next);
    if (user && supabaseConfigured) void supabase.auth.updateUser({ data: { game_progress: next } }).catch(() => { /* se reintenta en el próximo guardado */ });
  }, [user]);

  return { progress, save, ready, signedIn: Boolean(user) };
}
