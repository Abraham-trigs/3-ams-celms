import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const isSuccessful =
      data.ResponseCode === "000" || data.Data?.Status === "Success";

    if (!isSuccessful) {
      return NextResponse.json({ received: true });
    }

    const reference = data.Data?.ClientReference;

    // DO NOT mutate UI or store here
    // Instead: trigger backend domain logic (PaymentService or JobService)

    console.log(`Payment verified: ${reference}`);

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: "Webhook Failed" }, { status: 500 });
  }
}
