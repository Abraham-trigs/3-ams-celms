import { apiHandler } from "@/server/core/apiHandler";
import { clientService } from "@/server/services/client.service";
import { eventBus } from "@/server/events/eventBus";

// GET
export const GET = apiHandler(async ({ orgId, query, pagination }) => {
  const result = await clientService.search(orgId, query.query || "", {
    page: pagination.page,
    perPage: pagination.limit,
  });

  return result;
});

// POST
export const POST = apiHandler(
  async ({ orgId, body }) => {
    const client = await clientService.create({
      ...body,
      orgId,
    });

    eventBus.publish("client.created", client, {
      orgId,
      entityId: client.id,
    });

    return client;
  },
  {
    requireOrg: true,
  },
);
