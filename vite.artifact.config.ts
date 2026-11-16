// Compila EDUCALEX como una sola página HTML autocontenida para publicarla como artefacto de Claude.
// Uso: bun run build:artifact  →  dist-artifact/index.html
import { defineConfig, type Plugin } from "vite";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

const src = path.resolve(__dirname, "src");
const swaps: Record<string, string> = {
  "@/integrations/supabase/client": path.join(src, "artifact/supabase-stub.ts"),
  "@/lib/learning.functions": path.join(src, "artifact/learning-local.ts"),
  "@/lib/practice-access.functions": path.join(src, "artifact/practice-access-stub.ts"),
  "@/lib/runtime-mode": path.join(src, "artifact/runtime-mode.ts"),
};

/** Sustituye módulos de servidor por sus versiones de artefacto, también cuando se importan por ruta relativa. */
function artifactSwaps(): Plugin {
  return {
    name: "educalex-artifact-swaps",
    enforce: "pre",
    resolveId(id, importer) {
      if (swaps[id]) return swaps[id];
      if (id.startsWith(".") || path.isAbsolute(id)) {
        const abs = (path.isAbsolute(id) ? id : path.resolve(path.dirname(importer ?? src), id)).replace(/\.(ts|tsx)$/, "");
        for (const [alias, target] of Object.entries(swaps)) if (abs === path.join(src, alias.slice(2))) return target;
        if (abs === path.join(src, "routes/api/docente-ia")) return path.join(src, "artifact/api-stub.ts");
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [artifactSwaps(), tailwindcss(), viteReact(), viteSingleFile()],
  resolve: { alias: { "@": src }, dedupe: ["react", "react-dom", "@tanstack/react-query"] },
  css: { transformer: "lightningcss" },
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: "dist-artifact",
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    rollupOptions: { input: path.resolve(__dirname, "artifact.html") },
  },
});
