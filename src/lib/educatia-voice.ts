// Voz de EducatIA: síntesis y reconocimiento de voz del propio navegador (Web Speech API).
// No envía audio a servidores de EDUCALEX. El reconocimiento de voz depende del navegador (Chrome, Edge y Android lo ofrecen).

/** Quita el formato Markdown para que la lectura en voz alta suene natural. */
export function textForSpeech(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\((?:[^)]+)\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "enlace")
    .replace(/[*_`#>|]+/g, " ")
    .replace(/^\s*[-•]\s+/gm, ". ")
    .replace(/\s+/g, " ")
    .trim();
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

const PREFERRED = ["es-CO", "es-419", "es-MX", "es-US", "es-ES"];
// Voces femeninas conocidas de Windows/Edge (Natural), Chrome, Android y Apple. Las "Natural"/"Online" suenan más humanas.
const FEMALE = /salome|dalia|paloma|elvira|ximena|larissa|renata|camila|catalina|elena|helena|laura|lupe|mia|monica|mónica|paulina|marisol|sabina|soledad|ines|inés|google español|esc-|female|mujer/i;
const MALE = /gonzalo|jorge|diego|juan|pablo|raul|raúl|alvaro|álvaro|carlos|enrique|tomas|tomás|male|hombre/i;
const VOICE_KEY = "educatia-voz";

export function spanishVoices(): SpeechSynthesisVoice[] {
  if (!speechSupported()) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("es"));
}

/** Puntúa una voz: más alta = más natural y femenina, con acento latinoamericano. */
export function voiceScore(v: { name: string; lang: string; localService?: boolean }): number {
  let score = 0;
  if (/natural|neural|online|enhanced|premium|mejorada/i.test(v.name)) score += 40;
  if (FEMALE.test(v.name)) score += 30;
  if (MALE.test(v.name)) score -= 50;
  const i = PREFERRED.indexOf(PREFERRED.find((l) => l.toLowerCase() === v.lang.toLowerCase()) ?? "");
  if (i >= 0) score += 10 - i * 2;
  return score;
}

export function savedVoiceName(): string | null {
  try { return window.localStorage.getItem(VOICE_KEY); } catch { return null; }
}
export function saveVoiceName(name: string): void {
  try { window.localStorage.setItem(VOICE_KEY, name); } catch { /* sin almacenamiento */ }
}

function spanishVoice(): SpeechSynthesisVoice | undefined {
  const voices = spanishVoices();
  const chosen = savedVoiceName();
  const saved = chosen ? voices.find((v) => v.name === chosen) : undefined;
  if (saved) return saved;
  return [...voices].sort((x, y) => voiceScore(y) - voiceScore(x))[0];
}

/** Lee el texto en voz alta. Devuelve false si el navegador no tiene síntesis de voz. */
export function speak(markdown: string, opts: { rate?: number; onEnd?: () => void } = {}): boolean {
  if (!speechSupported()) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const text = textForSpeech(markdown);
  if (!text) return false;
  // Algunos navegadores cortan textos largos: se lee por fragmentos de oraciones.
  const chunks = text.match(/[^.!?¿¡]+[.!?]*|\S+/g)?.reduce<string[]>((acc, s) => {
    const last = acc.at(-1);
    if (last && (last + " " + s).length < 220) acc[acc.length - 1] = `${last} ${s.trim()}`;
    else acc.push(s.trim());
    return acc;
  }, []) ?? [text];
  const voice = spanishVoice();
  chunks.forEach((chunk, i) => {
    const u = new SpeechSynthesisUtterance(chunk);
    u.lang = voice?.lang ?? "es-CO";
    if (voice) u.voice = voice;
    u.rate = opts.rate ?? 0.97;
    u.pitch = 1.05;
    if (i === chunks.length - 1 && opts.onEnd) { u.onend = opts.onEnd; u.onerror = opts.onEnd; }
    synth.speak(u);
  });
  return true;
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}

type RecognitionLike = {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void;
};

function recognitionCtor(): (new () => RecognitionLike) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function listeningSupported(): boolean {
  return !!recognitionCtor();
}

/** Escucha una pregunta hablada. Llama a onText con el texto reconocido (parcial y final). Devuelve una función para detener. */
export function listen(handlers: { onText: (text: string, final: boolean) => void; onError: (message: string) => void; onEnd: () => void }): (() => void) | null {
  const Ctor = recognitionCtor();
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "es-CO";
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = (e) => {
    let text = "";
    let final = false;
    for (let i = 0; i < e.results.length; i++) {
      const r = e.results[i];
      if (!r) continue;
      text += r[0]?.transcript ?? "";
      if (r.isFinal) final = true;
    }
    handlers.onText(text.trim(), final);
  };
  rec.onerror = (e) => {
    handlers.onError(e.error === "not-allowed" || e.error === "service-not-allowed"
      ? "No hay permiso para usar el micrófono. Actívalo en el candado de la barra de direcciones."
      : e.error === "no-speech" ? "No se escuchó ninguna pregunta. Intenta de nuevo." : "No fue posible usar el micrófono.");
  };
  rec.onend = handlers.onEnd;
  try { rec.start(); } catch { return null; }
  return () => { try { rec.stop(); } catch { /* ya detenido */ } };
}
