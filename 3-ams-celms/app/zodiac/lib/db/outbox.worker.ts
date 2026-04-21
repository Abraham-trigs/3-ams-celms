import { prisma } from "@/lib/db/prisma";
import { eventBus } from "@/server/events/eventBus";

export async function processOutbox() {
  // 1. Atomically claim events (prevents double workers picking same rows)
  await prisma.outboxEvent.updateMany({
    where: { status: "PENDING" },
    data: { status: "PROCESSING" },
  });

  // 2. Fetch claimed events
  const events = await prisma.outboxEvent.findMany({
    where: { status: "PROCESSING" },
    take: 50,
    orderBy: { createdAt: "asc" },
  });

  for (const event of events) {
    try {
      // publish to realtime/event system
      eventBus.publish(event.type, event.payload);

      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: "SENT" },
      });
    } catch (err) {
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: {
          status: "FAILED",
          error: err instanceof Error ? err.message : "Unknown error",
        },
      });
    }
  }
}
