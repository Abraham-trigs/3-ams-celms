import { eventBus } from "@/server/events/eventBus";
import { ClientRepository } from "@/lib/repositories/client.repository";

export const clientService = {
  async create(data: any) {
    const client = await ClientRepository.create(data);

    eventBus
      .publish("client.created", client, {
        orgId: data.orgId,
        entityId: client.id,
      })
      .catch(console.error);

    return client;
  },
};
