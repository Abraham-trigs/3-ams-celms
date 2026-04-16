// lib/services/b2b.service.ts

import { B2BRepository } from "@/lib/repositories/b2b.repository";
import { JobRepository } from "@/lib/repositories/job.repository";

export class B2BService {
  static async pushJob(params: {
    orgId: string;
    jobId: string;
    specs: string;
    deadline: Date;
    suggestedPrice?: number;
  }) {
    const job = await JobRepository.findById(params.orgId, params.jobId);

    if (!job) throw new Error("Job not found");

    return B2BRepository.create({
      orgId: params.orgId,
      originalJobId: job.id,
      clientName: job.client.name,
      serviceName: job.serviceName,
      specs: params.specs,
      deadline: params.deadline,
      suggestedPrice: params.suggestedPrice,
    });
  }
}
