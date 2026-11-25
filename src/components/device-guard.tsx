import { useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAccount } from "@/components/account-session";
import { supabase } from "@/integrations/supabase/client";
import { registerDevice } from "@/lib/devices.functions";
import { isArtifact } from "@/lib/runtime-mode";

const KEY = "educalex-dispositivo";
export const DEVICE_LIMIT_FLAG = "educalex-limite-dispositivos";

function deviceId() {
  try {
    let id = localStorage.getItem(KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(KEY, id); }
    return id;
  } catch { return null; }
}

function deviceLabel() {
  const ua = navigator.userAgent;
  const os = /Android/i.test(ua) ? "Android" : /iPhone|iPad/i.test(ua) ? "iPhone/iPad" : /Windows/i.test(ua) ? "Windows" : /Mac/i.test(ua) ? "Mac" : "Otro";
  const br = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Navegador";
  return `${br} en ${os}`;
}

/** Comprueba que la cuenta no se use en más de tres dispositivos; si se excede, cierra la sesión en este. */
export function DeviceGuard() {
  const { user } = useAccount();
  const register = useServerFn(registerDevice);
  const checked = useRef<string | null>(null);
  useEffect(() => {
    if (isArtifact || !user || checked.current === user.id) return;
    const id = deviceId();
    if (!id) return;
    checked.current = user.id;
    register({ data: { id, label: deviceLabel() } })
      .then(async r => {
        if (r.ok) return;
        try { sessionStorage.setItem(DEVICE_LIMIT_FLAG, "1"); } catch { /* sin almacenamiento */ }
        await supabase.auth.signOut();
        window.location.assign("/ingresar");
      })
      .catch(() => { checked.current = null; });
  }, [user, register]);
  return null;
}
