import { UnitOfWork } from "@/lib/db/unitOfWork";
import { Outbox } from "@/lib/db/outbox";

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

    return UnitOfWork.run(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          orgId,
          jobId,
          amount,
          method,
          reference,
          confirmedBy,
        },
      });

      const job = await tx.job.update({
        where: { id: jobId },
        data: {
          isPaid: true,
          paymentStatus: "PAID",
          paymentRef: reference,
        },
      });

      await Outbox.add(tx, {
        type: "payment.confirmed",
        orgId,
        payload: { payment, job },
      });

      return job;
    });
  }
}
