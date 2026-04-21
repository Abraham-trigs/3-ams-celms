import { DbClient } from "@/lib/db/prisma-client";

export class Outbox {
  static async add(
    tx: DbClient,
    event: {
      type: string;
      payload: any;
      orgId: string;
    },
  ) {
    return tx.outboxEvent.create({
      data: {
        type: event.type,
        payload: event.payload,
        orgId: event.orgId,
      },
    });
  }
}
