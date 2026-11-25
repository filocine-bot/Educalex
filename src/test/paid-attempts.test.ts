import { describe, expect, it } from "vitest";
import { attemptKey, MAX_PAID_ATTEMPTS, remainingAttempts } from "@/lib/paid-attempts";
describe("intentos de niveles pagados", () => {
  it("permite tres intentos por nivel y perfil", () => {
    expect(MAX_PAID_ATTEMPTS).toBe(3);
    expect(remainingAttempts({}, "rector", 2)).toBe(3);
    expect(remainingAttempts({ [attemptKey("rector", 2)]: 2 }, "rector", 2)).toBe(1);
    expect(remainingAttempts({ [attemptKey("rector", 2)]: 5 }, "rector", 2)).toBe(0);
    expect(remainingAttempts({ [attemptKey("rector", 2)]: 3 }, "rector", 3)).toBe(3);
  });
});
