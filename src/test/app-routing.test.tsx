import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { courses, libraryDocs, pages } from "@/lib/educalex-sitemap";

const router = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("App routing", () => {
  it("matches a page for /", () => {
    expect(router().matchRoutes("/").at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("every requested section path resolves to a real page", () => {
    const r = router();
    for (const path of [...Object.keys(pages), "/docente-ia", "/nosotros"]) {
      const last = r.matchRoutes(path).at(-1);
      expect(last?.routeId, path).not.toBe(rootRouteId);
    }
  });

  it("every child and related link in the sitemap points to a defined page", () => {
    const known = new Set([...Object.keys(pages), "/docente-ia", "/nosotros"]);
    for (const p of Object.values(pages) as { children?: string[]; related?: string[]; parent?: string }[]) {
      for (const l of [...(p.children ?? []), ...(p.related ?? []), ...(p.parent ? [p.parent] : [])]) expect(known.has(l), l).toBe(true);
    }
  });

  it("course catalog lists the 15 requested courses, each with its own page", () => {
    expect(courses).toHaveLength(15);
    for (const c of courses) expect(pages[c.path], c.path).toBeDefined();
  });

  it("library documents never claim verified validity and link to real pages", () => {
    for (const d of libraryDocs) for (const r of d.related) expect(pages[r], r).toBeDefined();
  });
});
