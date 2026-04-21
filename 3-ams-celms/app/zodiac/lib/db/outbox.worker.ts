import { prisma } from "@/lib/db/prisma";
import { eventBus } from "@/server/events/eventBus";

export async function processOutbox() {
  const events = await prisma.outboxEvent.findMany({
    where: { status: "PENDING" },
    take: 50,
    orderBy: { createdAt: "asc" },
  });

  for (const event of events) {
    try {
      // 1. publish to in-app event system
      eventBus.publish(event.type, event.payload);

      // 2. mark as sent
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: "SENT" },
      });
    } catch (err) {
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: "FAILED" },
      });
    }
  }
}
