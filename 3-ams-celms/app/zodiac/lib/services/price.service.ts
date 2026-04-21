import { prisma } from "@/lib/prisma";

export const priceService = {
  async list(orgId: string) {
    return prisma.priceList.findFirst({
      where: {
        companyId: orgId,
        isActive: true,
      },
      include: {
        items: true,
      },
    });
  },

  async updatePrice(serviceId: string, price: number, orgId: string) {
    // tenant ownership check
    const existing = await prisma.priceItem.findFirst({
      where: {
        id: serviceId,
        priceList: {
          companyId: orgId,
        },
      },
    });

    if (!existing) {
      throw new Error("Price item not found");
    }

    return prisma.priceItem.update({
      where: {
        id: serviceId,
      },
      data: {
        unitPrice: price,
      },
    });
  },
};
