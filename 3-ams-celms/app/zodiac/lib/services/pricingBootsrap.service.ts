import { prisma } from "@/lib/prisma";

export class PricingBootstrapService {
  async createInitialPriceList(input: {
    companyId: string;
    name: string;
    items: {
      serviceName: string;
      unitPrice: number;
    }[];
  }) {
    return prisma.$transaction(async (tx) => {
      // prevent duplicate active price list for tenant
      const existing = await tx.priceList.findFirst({
        where: {
          companyId: input.companyId,
          isActive: true,
        },
      });

      if (existing) {
        return existing;
      }

      return tx.priceList.create({
        data: {
          companyId: input.companyId,
          name: input.name,
          isActive: true,
          items: {
            create: input.items,
          },
        },
      });
    });
  }
}
