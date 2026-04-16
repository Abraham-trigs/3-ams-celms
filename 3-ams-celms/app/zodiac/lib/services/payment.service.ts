// lib/services/payment.service.ts

import { prisma } from "@/lib/db/prisma";
import { JobRepository } from "@/lib/repositories/job.repository";

export class PaymentService {
  static async confirmPayment(params: {
    orgId: string;
    jobId: string;
    amount: number;
    method: any;
    reference?: string;
    confirmedBy?: string;
  }) {
    const { orgId, jobId, amount, method, reference, confirmedBy } = params;

    return prisma.$transaction(async (tx) => {
      // 1. Record payment
      await tx.payment.create({
        data: {
          orgId,
          jobId,
          amount,
          method,
          reference,
          confirmedBy,
        },
      });

      // 2. Mark job as paid
      const job = await tx.job.update({
        where: { id: jobId },
        data: {
          isPaid: true,
          paymentStatus: "PAID",
          paymentRef: reference,
        },
      });

      return job;
    });
  }
}
