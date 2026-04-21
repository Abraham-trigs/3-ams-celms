import { apiHandler } from "@/server/core/apiHandler";
import { JobService } from "@/server/services/job.service";

// GET
export const GET = apiHandler(async ({ orgId }) => {
  return JobService.loadJobs(orgId);
});

// POST
export const POST = apiHandler(
  async ({ orgId, body }) => {
    return JobService.createJob({
      ...body,
      orgId,
    });
  },
  {
    requireOrg: true,
  },
);
