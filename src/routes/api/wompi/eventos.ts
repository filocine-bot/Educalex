import { createFileRoute } from "@tanstack/react-router";
import { verifyEvent } from "@/lib/payments";
import { logWompiEvent, settlePayment } from "@/lib/payments.server";

// Wompi avisa aquí cada cambio de estado de una transacción.
export const Route = createFileRoute("/api/wompi/eventos")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["WOMPI_EVENTS_SECRET"]?.trim();
        const ev = await request.json().catch(() => null);
        const tx = ev?.data?.transaction;
        const base = { event: ev?.event, reference: tx?.reference, transaction_id: tx?.id, wompi_status: tx?.status };
        if (!secret) { await logWompiEvent({ ...base, http_status: 503, outcome: "falta WOMPI_EVENTS_SECRET en Vercel" }); return new Response("not configured", { status: 503 }); }
        if (!ev || !(await verifyEvent(ev, secret))) { await logWompiEvent({ ...base, http_status: 401, outcome: "firma inválida: la clave de eventos no coincide" }); return new Response("invalid signature", { status: 401 }); }
        if (ev.event === "transaction.updated" && tx) {
          try {
            const r = await settlePayment(tx);
            await logWompiEvent({ ...base, http_status: 200, outcome: `pago ${r.status}`, detail: [r.product, r.detail, r.mail].filter(Boolean).join(" · ") });
          } catch (e) {
            await logWompiEvent({ ...base, http_status: 500, outcome: "error al activar", detail: (e as Error).message });
            console.error("wompi evento", (e as Error).message); return new Response("retry", { status: 500 });
          }
        } else await logWompiEvent({ ...base, http_status: 200, outcome: "evento ignorado" });
        return Response.json({ ok: true });
      },
    },
  },
});
