import { describe, expect, it } from "vitest";
import { officialVideos, type OfficialVideo } from "@/lib/official-videos";

describe("videos oficiales de apoyo", () => {
  const all: OfficialVideo[] = Object.values(officialVideos).flat();
  it("tienen identificadores de YouTube válidos y únicos", () => {
    for (const v of all) expect(v.id).toMatch(/^[A-Za-z0-9_-]{11}$/);
    expect(new Set(all.map(v => v.id)).size).toBe(all.length);
  });
  it("enlazan la transcripción oficial del MEN", () => {
    for (const v of all) expect(v.transcript).toMatch(/^https:\/\/www\.mineducacion\.gov\.co\//);
  });
  it("incluyen videos en Lengua de Señas Colombiana", () => {
    expect(all.filter(v => v.lsc).length).toBe(4);
  });
});
