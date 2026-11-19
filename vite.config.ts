// Configuración estándar de Vite para EDUCALEX (sin dependencias de Lovable).
// Destino de publicación: Vercel por defecto. Para otro proveedor, defina NITRO_PRESET
// (por ejemplo "cloudflare-module", "netlify" o "node-server").
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) define[`import.meta.env.${key}`] = JSON.stringify(value);

  return {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        server: { entry: "server" },
        importProtection: { behavior: "error", client: { files: ["**/server/**"], specifiers: ["server-only"] } },
      }),
      ...(command === "build" ? [nitro({ preset: process.env["NITRO_PRESET"] || "vercel", vercel: { functions: { maxDuration: 60 } } })] : []),
      viteReact(),
    ],
  };
});
