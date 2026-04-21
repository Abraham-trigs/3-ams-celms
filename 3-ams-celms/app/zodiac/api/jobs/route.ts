import { apiHandler } from "@/server/core/apiHandler";
import { JobService } from "@/server/services/job.service";
import { eventBus } from "@/server/events/eventBus";

// GET (clean pagination already handled by kernel)
export const GET = apiHandler(async ({ orgId }) => {
  const data = await JobService.loadJobs(orgId);

  return data;
});

// POST
export const POST = apiHandler(
  async ({ orgId, body }) => {
    const job = await JobService.createJob({
      ...body,
      orgId,
    });

    eventBus.publish({
      type: "job.created",
      payload: job,
      meta: { source: "server", orgId },
    });

    return job;
  },
  {
    requireOrg: true,
  },
);
