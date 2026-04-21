import { prisma } from "@/lib/db/prisma";
import { JobRepository } from "@zodiac/lib/repositories/job.repository";
import { StockRepository } from "@zodiac/lib/repositories/stock.repository";
import { PriceItem } from "@zodiac/types/zodiac.types";

export class JobService {
  /**
   * CREATE JOB (source of truth)
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
      const isLargeFormat = service.unit === "sqft" || service.unit === "sqm";

      const units = isLargeFormat ? (width || 1) * (height || 1) : 1;

      const totalPrice = units * quantity * service.priceGHS;

      // STOCK DEDUCTION (FIXED METHOD NAME + CONSISTENT REPO USAGE)
      if (service.stockRefId) {
        await StockRepository.deduct(
          orgId,
          service.stockRefId,
          units * quantity,
        );
      }

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

  static async confirmPayment(orgId: string, jobId: string, ref: string) {
    return JobRepository.confirmPayment(orgId, jobId, ref);
  }

  static async loadJobs(orgId: string) {
    return JobRepository.findAll(orgId);
  }
}
