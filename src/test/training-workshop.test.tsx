import { act, fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TrainingWorkshop } from "@/components/training-workshop";
import { trainingCourses } from "@/lib/training-courses";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Taller local de autoestudio", () => {
  const workshop = trainingCourses["/formacion/inclusion-dua-piar"].workshop;
  it("edita, copia los datos actuales y solo vacía después de confirmar", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<TrainingWorkshop workshop={workshop} />);
    const field = screen.getByLabelText("Aprendizaje y criterio");
    fireEvent.change(field, { target: { value: "Justificar una secuencia ficticia" } });
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Copiar taller" })); });
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("Justificar una secuencia ficticia"));
    fireEvent.click(screen.getByRole("button", { name: "Vaciar taller" }));
    expect(field).toHaveValue("Justificar una secuencia ficticia");
    fireEvent.click(screen.getByRole("button", { name: "Confirmar vaciado" }));
    expect(field).toHaveValue("");
  });
  it("no conserva el borrador después de desmontar el taller", () => {
    const view = render(<TrainingWorkshop workshop={workshop} />);
    fireEvent.change(screen.getByLabelText("Aprendizaje y criterio"), { target: { value: "Práctica temporal" } });
    view.unmount();
    render(<TrainingWorkshop workshop={workshop} />);
    expect(screen.getByLabelText("Aprendizaje y criterio")).toHaveValue("");
  });
  it("carga un ejemplo editable y llama a impresión local", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<TrainingWorkshop workshop={workshop} />);
    fireEvent.click(screen.getByRole("button", { name: "Cargar ejemplo ficticio" }));
    expect(screen.getByLabelText("Aprendizaje y criterio")).toHaveValue(workshop.fields[0]?.example);
    fireEvent.click(screen.getByRole("button", { name: "Imprimir o guardar en PDF" }));
    expect(print).toHaveBeenCalledOnce();
  });
});