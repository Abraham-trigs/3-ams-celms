import { apiHandler } from "@/server/core/apiHandler";
import { JobService } from "@zodiac/services/job.service";
import { eventBus } from "@/server/events/eventBus";

export const PATCH = apiHandler(
  async ({ orgId, params, body }) => {
    const updated = await JobService.updateStatus(
      orgId,
      params.id,
      body.status,
    );

    eventBus.publish({
      type: "job.updated",
      payload: updated,
      meta: { source: "server", orgId },
    });

    return updated;
  },
  {
    requireOrg: true,
  },
);
