// lib/services/job.service.ts

import { prisma } from "@/lib/db/prisma";
import { JobRepository } from "@/lib/repositories/job.repository";
import { StockRepository } from "@/lib/repositories/stock.repository";
import { PriceItem } from "@prisma/client";

export class JobService {
  /**
   * FULL TRANSACTION:
   * - validate service
   * - calculate price
   * - deduct stock
   * - create job
   */
  static async createJob(params: {
    orgId: string;
    clientId: string;
    service: PriceItem;
    quantity: number;
    width?: number;
    height?: number;
    assignedStaffId?: string;
    notes?: string;
  }) {
    const {
      orgId,
      clientId,
      service,
      quantity,
      width,
      height,
      assignedStaffId,
      notes,
    } = params;

    return prisma.$transaction(async (tx) => {
      // 1. Calculate units
      const isLargeFormat = service.unit === "sqft" || service.unit === "sqm";

      const units = isLargeFormat ? (width || 1) * (height || 1) : 1;

      const totalPrice = units * quantity * service.priceGHS;

      // 2. Deduct stock if linked
      if (service.stockRefId) {
        await tx.stockItem.update({
          where: { id: service.stockRefId },
          data: {
            totalRemaining: {
              decrement: units * quantity,
            },
          },
        });
      }

      // 3. Create job
      const job = await tx.job.create({
        data: {
          orgId,
          clientId,
          serviceId: service.id,
          serviceName: service.name,
          quantity,
          width,
          height,
          unit: service.unit,
          totalPrice,
          assignedStaffId,
          notes,
        },
      });

      return job;
    });
  }

  static async updateStatus(orgId: string, jobId: string, status: any) {
    return JobRepository.updateStatus(orgId, jobId, status);
  }

  static async assignStaff(orgId: string, jobId: string, staffId: string) {
    return JobRepository.assignStaff(orgId, jobId, staffId);
  }
}
