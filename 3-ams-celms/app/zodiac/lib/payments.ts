// lib/payments.ts
export const initiateSubscriptionPayment = async (
  phoneNumber: string,
  amount: number,
  planName: string,
) => {
  const credentials = Buffer.from(
    `${process.env.HUBTEL_CLIENT_ID}:${process.env.HUBTEL_CLIENT_SECRET}`,
  ).toString("base64");

  // Format number: Hubtel requires 233 format (e.g., 233541234567)
  const formattedNumber = phoneNumber.startsWith("0")
    ? `233${phoneNumber.substring(1)}`
    : phoneNumber;

  const response = await fetch(
    `https://hubtel.com{process.env.HUBTEL_MERCHANT_ID}/receive/mobilemoney`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CustomerName: "Zodiac User",
        CustomerMsisdn: formattedNumber,
        CustomerEmail: "",
        Channel: "mtn-gh", // Or 'telecel-gh', 'at-gh'
        Amount: amount.toFixed(2), // Must be decimal string (e.g., "150.00")
        PrimaryCallbackUrl: "https://yourdomain.com",
        Description: `Zodiac Subscription: ${planName}`,
        ClientReference: `ZOD-${Date.now()}`, // Must be unique for idempotency
      }),
    },
  );

  return response.json();
};
