import { NextResponse } from "next/server";
import { useZodiac } from "@/store/zodiac.store"; // For conceptual mapping

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Verify Status from Hubtel
    // Hubtel returns "Success" or "Failed" in the 'Status' or 'Data.Status' field
    const isSuccessful =
      data.ResponseCode === "000" || data.Data?.Status === "Success";

    if (!isSuccessful) {
      console.log("Payment Failed or Cancelled:", data.Data?.Message);
      return NextResponse.json({ received: true }); // Still return 200 to Hubtel
    }

    // 2. Identify the User/Plan
    // The 'ClientReference' we sent earlier (e.g., ZOD-SUBSCRIPTION-123)
    const reference = data.Data?.ClientReference;

    // 3. THE "SHOT": UPGRADE ACCOUNT
    // Logic: Look up the user by reference and update their planId to "DOMINATE" or "GROW"
    console.log(`Payment Verified for ${reference}. Upgrading user...`);

    // 4. Notify the App (e.g., via a socket or DB update)
    // markUserAsPaid(reference);

    return NextResponse.json({ message: "Account Upgraded" }, { status: 200 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ error: "Webhook Failed" }, { status: 500 });
  }
}
