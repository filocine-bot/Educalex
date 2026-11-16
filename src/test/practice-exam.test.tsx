import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PracticeExam } from "@/components/practice-exam";
import { PracticeSessionProvider, usePracticeSession } from "@/components/practice-session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });

vi.mock("@/components/practice-results", () => ({
  ResultDetail: ({ result, onRepeat }: { result: { answers: (number | null)[]; timedOut: boolean }; onRepeat: () => void }) => <div><output data-testid="delivery">{JSON.stringify(result)}</output><button onClick={onRepeat}>Repeat</button></div>,
}));

function DeliveryCount() {
  const { results } = usePracticeSession();
  return <output data-testid="delivery-count">{results.length}</output>;
}
function mount() {
  render(<QueryClientProvider client={new QueryClient()}><PracticeSessionProvider><PracticeExam profile="ingreso-docente" /><DeliveryCount /></PracticeSessionProvider></QueryClientProvider>);
}
function selectAnswer(index: number) {
  const radio = screen.getAllByRole("radio")[index];
  if (!radio) throw new Error(`Missing answer ${index}`);
  fireEvent.click(radio);
}
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Reglas de entrega interactiva", () => {
  it("la respuesta seleccionada permanece al navegar y no entrega antes de confirmar", () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Comenzar práctica" }));
    selectAnswer(1);
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    fireEvent.click(screen.getByRole("button", { name: "Anterior" }));
    expect(screen.getAllByRole("radio")[1]).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Entregar práctica" }));
    expect(screen.queryByTestId("delivery")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Confirmar entrega" }));
    expect(JSON.parse(screen.getByTestId("delivery").textContent ?? "{}").answers).toEqual([1, ...Array(19).fill(null)]);
    expect(screen.getByTestId("delivery-count")).toHaveTextContent("1");
  });
  it("entrega una sola vez al agotarse los cinco minutos, conservando la respuesta", () => {
    vi.useFakeTimers();
    mount();
    fireEvent.change(screen.getByLabelText("Tiempo de práctica"), { target: { value: "5" } });
    fireEvent.click(screen.getByRole("button", { name: "Comenzar práctica" }));
    selectAnswer(0);
    act(() => vi.advanceTimersByTime(300000));
    const result = JSON.parse(screen.getByTestId("delivery").textContent ?? "{}");
    expect(result.timedOut).toBe(true);
    expect(result.elapsedSeconds).toBe(300);
    expect(result.answers).toEqual([0, ...Array(19).fill(null)]);
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByTestId("delivery-count")).toHaveTextContent("1");
  });
  it("sin límite no entrega automáticamente y repetir borra las respuestas del intento", () => {
    vi.useFakeTimers();
    mount();
    fireEvent.change(screen.getByLabelText("Tiempo de práctica"), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Comenzar práctica" }));
    selectAnswer(2);
    act(() => vi.advanceTimersByTime(3600000));
    expect(screen.queryByTestId("delivery")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Entregar práctica" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirmar entrega" }));
    fireEvent.click(screen.getByRole("button", { name: "Repeat" }));
    fireEvent.click(screen.getByRole("button", { name: "Comenzar práctica" }));
    expect(screen.getAllByRole("radio").every(radio => !(radio as HTMLInputElement).checked)).toBe(true);
    expect(screen.getByTestId("delivery-count")).toHaveTextContent("1");
  });
});