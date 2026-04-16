// lib/repositories/job.repository.ts

import { prisma } from "@/lib/db/prisma";
import { JobStatus, PaymentStatus } from "@prisma/client";

export class JobRepository {
  static async create(data: {
    orgId: string;
    clientId: string;
    serviceId: string;
    serviceName: string;
    quantity: number;
    width?: number;
    height?: number;
    unit?: string;
    totalPrice: number;
    costPrice?: number;
    profitMargin?: number;
    assignedStaffId?: string;
    notes?: string;
  }) {
    return prisma.job.create({ data });
  }

  static async findById(orgId: string, id: string) {
    return prisma.job.findFirst({
      where: { id, orgId },
      include: {
        client: true,
        assignedStaff: true,
      },
    });
  }

  static async list(
    orgId: string,
    params?: {
      status?: JobStatus;
      paymentStatus?: PaymentStatus;
      take?: number;
      skip?: number;
    },
  ) {
    return prisma.job.findMany({
      where: {
        orgId,
        ...(params?.status && { status: params.status }),
        ...(params?.paymentStatus && { paymentStatus: params.paymentStatus }),
      },
      orderBy: { createdAt: "desc" },
      take: params?.take ?? 50,
      skip: params?.skip ?? 0,
    });
  }

  static async updateStatus(orgId: string, jobId: string, status: JobStatus) {
    return prisma.job.update({
      where: { id: jobId },
      data: { status },
    });
  }

  static async assignStaff(orgId: string, jobId: string, staffId: string) {
    return prisma.job.update({
      where: { id: jobId },
      data: { assignedStaffId: staffId },
    });
  }

  static async markPaid(orgId: string, jobId: string, reference?: string) {
    return prisma.job.update({
      where: { id: jobId },
      data: {
        paymentStatus: "PAID",
        isPaid: true,
        paymentRef: reference,
      },
    });
  }

  static async deleteCompleted(orgId: string) {
    return prisma.job.deleteMany({
      where: {
        orgId,
        status: "COMPLETED",
      },
    });
  }
}
