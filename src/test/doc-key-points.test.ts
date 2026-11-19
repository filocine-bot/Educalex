import { expect, it } from "vitest";
import { docKeyPoints, keyPointsFor } from "@/lib/doc-key-points";
import { libraryDocs } from "@/lib/educalex-sitemap";

it("las ideas clave solo se asocian a fichas existentes y citan su fuente", () => {
  const ids = new Set(libraryDocs.map(d => d.id));
  for (const [id, k] of Object.entries(docKeyPoints)) {
    expect(ids.has(id), id).toBe(true);
    expect(k.points.length).toBeGreaterThanOrEqual(3);
    for (const p of k.points) expect(p.source.length, `${id}: ${p.label}`).toBeGreaterThan(2);
  }
  expect(keyPointsFor("dua")).toBe(docKeyPoints["decreto-1421-2017"]);
});
