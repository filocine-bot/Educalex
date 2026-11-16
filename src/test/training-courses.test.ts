import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { courses, getLibraryDoc, getPage } from "@/lib/educalex-sitemap";
import { isTrainingPath, serializeWorkshop, trainingCourses, type TrainingPath } from "@/lib/training-courses";

const paths: TrainingPath[] = ["/formacion/inclusion-dua-piar", "/formacion/convivencia-escolar", "/formacion/educacion-rural", "/formacion/steam-robotica"];

describe("Tercera etapa de formación", () => {
  it.each(paths)("%s tiene cinco unidades y está conectado a su ruta y catálogo", path => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(trainingCourses[path].units).toHaveLength(5);
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
    expect(courses.some(course => course.path === path)).toBe(true);
  });

  it.each(paths)("%s resuelve todas las lecturas y vínculos pertinentes", path => {
    const course = trainingCourses[path];
    expect(course.related.some(link => link.startsWith("/concursos/"))).toBe(true);
    expect(course.related.some(link => link.startsWith("/simulacros/"))).toBe(true);
    for (const link of course.related) expect(getPage(link), link).toBeDefined();
    for (const unit of course.units) {
      expect(unit.readings.length).toBeGreaterThan(0);
      for (const reading of unit.readings) {
        const doc = getLibraryDoc(reading.docId);
        expect(doc, reading.docId).toBeDefined();
        expect(getPage(doc?.shelf ?? "")).toBeDefined();
        if (doc?.fuenteConsultada) expect(doc.fuenteUrl).toMatch(/^https:\/\//);
        else expect(doc?.fuenteUrl).toBeUndefined();
      }
    }
  });

  it.each(paths)("%s conserva los campos del taller al generar una copia local", path => {
    const workshop = trainingCourses[path].workshop;
    const keys = workshop.fields.map(field => field.key);
    expect(new Set(keys).size).toBe(keys.length);
    const values = Object.fromEntries(keys.map((key, index) => [key, `Decisión de práctica ${index}`]));
    const text = serializeWorkshop(workshop.title, workshop.fields, values);
    for (const value of Object.values(values)) expect(text).toContain(value);
    expect(values[keys[0] ?? ""]).toBe("Decisión de práctica 0");
  });

  it("no confunde las cuatro rutas desarrolladas con cursos pendientes", () => {
    expect(paths.every(isTrainingPath)).toBe(true);
    expect(isTrainingPath("/formacion/inteligencia-artificial")).toBe(false);
    expect(isTrainingPath("/formacion/educacion-emocional")).toBe(false);
  });
});