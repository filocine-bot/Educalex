import { createFileRoute } from "@tanstack/react-router";
import { verifyEvent } from "@/lib/payments";
import { settlePayment } from "@/lib/payments.server";

// Wompi avisa aquí cada cambio de estado de una transacción.
export const Route = createFileRoute("/api/wompi/eventos")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["WOMPI_EVENTS_SECRET"]?.trim();
        if (!secret) return new Response("not configured", { status: 503 });
        const ev = await request.json().catch(() => null);
        if (!ev || !(await verifyEvent(ev, secret))) return new Response("invalid signature", { status: 401 });
        if (ev.event === "transaction.updated" && ev.data?.transaction) {
          try { await settlePayment(ev.data.transaction); } catch (e) { console.error("wompi evento", (e as Error).message); return new Response("retry", { status: 500 }); }
        }
        return Response.json({ ok: true });
      },
    },
  },
});
