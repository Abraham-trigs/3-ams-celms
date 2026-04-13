export class PricingBootstrapService {
  async createInitialPriceList(input: {
    companyId: string;
    name: string;
    items: {
      serviceName: string;
      unitPrice: number;
    }[];
  }) {
    return prisma.priceList.create({
      data: {
        companyId: input.companyId,
        name: input.name,
        isActive: true,
        items: {
          create: input.items,
        },
      },
    });
  }
}
