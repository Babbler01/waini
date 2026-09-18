export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return response.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { reference, expectedAmount } = request.body;

    // Validate request
    if (!reference) {
      return response.status(400).json({
        success: false,
        message: "Payment reference is required"
      });
    }

    if (!expectedAmount) {
      return response.status(400).json({
        success: false,
        message: "Expected amount is required"
      });
    }

    // Verify transaction with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization:
            `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const paymentData =
      await paystackResponse.json();

    if (!paystackResponse.ok) {
      return response.status(400).json({
        success: false,
        message:
          paymentData.message ||
          "Unable to verify payment"
      });
    }

    const transaction = paymentData.data;

    // Check transaction status
    if (transaction.status !== "success") {
      return response.status(400).json({
        success: false,
        message: "Payment was not successful"
      });
    }

    // Paystack amount is returned in kobo
    if (transaction.amount !== expectedAmount) {
      return response.status(400).json({
        success: false,
        message: "Payment amount does not match order total"
      });
    }

    // Optional but useful currency check
    if (transaction.currency !== "NGN") {
      return response.status(400).json({
        success: false,
        message: "Unexpected payment currency"
      });
    }

    return response.status(200).json({
      success: true,
      message: "Payment verified successfully",

      payment: {
        reference: transaction.reference,
        amount: transaction.amount,
        status: transaction.status,
        currency: transaction.currency,
        paidAt: transaction.paid_at,
        channel: transaction.channel
      }
    });

  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return response.status(500).json({
      success: false,
      message: "Payment verification failed"
    });
  }
}