import { prisma } from "@/lib/prisma";

export class CompanyOnboardingService {
  async createCompany(input: { name: string; logoUrl?: string }) {
    return prisma.company.create({
      data: {
        name: input.name,
        logoUrl: input.logoUrl,
      },
    });
  }

  async setLocation(input: {
    companyId: string;
    digitalAddress?: string;
    locationUrl?: string;
  }) {
    return prisma.company.update({
      where: { id: input.companyId },
      data: {
        digitalAddress: input.digitalAddress,
        locationUrl: input.locationUrl,
      },
    });
  }

  async activateCompany(companyId: string) {
    // future: onboarding completion flag
    return prisma.company.update({
      where: { id: companyId },
      data: {},
    });
  }
}
