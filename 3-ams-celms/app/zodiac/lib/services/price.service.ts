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
    return prisma.priceItem.updateMany({
      where: {
        id: serviceId,
        priceList: {
          companyId: orgId,
        },
      },
      data: {
        unitPrice: price,
      },
    });
  },
};
