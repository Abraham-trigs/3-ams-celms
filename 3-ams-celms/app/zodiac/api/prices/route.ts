import { z } from "zod";
import { apiHandler } from "@/server/core/apiHandler";
import { priceService } from "@zodiac/services/price.service";
import { eventBus } from "@/server/events/eventBus";

const updatePriceSchema = z.object({
  serviceId: z.string().min(1),
  price: z.number().positive(),
});

export const GET = apiHandler(async ({ orgId }) => {
  const priceList = await priceService.list(orgId);

  return priceList?.items ?? [];
});

export const PATCH = apiHandler(
  async ({ orgId, body }) => {
    const updated = await priceService.updatePrice(
      body.serviceId,
      body.price,
      orgId,
    );

    eventBus.publish({
      type: "price.updated",
      payload: updated,
      meta: {
        source: "server",
        orgId,
      },
    });

    return updated;
  },
  {
    requireOrg: true,
    schema: updatePriceSchema,
  },
);
