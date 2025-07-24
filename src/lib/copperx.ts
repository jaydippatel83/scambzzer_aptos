import axios from "axios";

function convertToUSDTUnits(amountUsd: number): string {
  // CopperX expects 8 decimal places for USDT
  return (amountUsd * 1e8).toString();
}

export async function createCheckoutSession(data: any) {
  const options = {
    method: "POST",
    url: "https://api.copperx.io/api/v1/checkout/sessions",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_API_COPPERX}`,
    },
    data: {
      submitType: "pay",
      lineItems: {
        data: [
          {
            priceData: {
              currency: "usdt",
              productData: data.productData,
              unitAmount: convertToUSDTUnits(69),
              type: "one_time",
              productId: process.env.NEXT_PUBLIC_PRODUCT_ID,
            },
            quantity: 1,
          },
        ],
      },

      afterCompletion: "redirect",
      //   paymentSetting: {allowSwap: true, preferredChainId: 137},
      afterCompletionConfirmMsg: "Payment success",
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    },
  };

  const response = await axios.request(options);
  return { sessionData: response.data };
}

export async function addSession(obj: any) {
  var success = false;
  await axios
    .post("https://api2.cointopper.com/payment/update-checkout-session", obj)
    .then(() => {
      success = true;
    })
    .catch((err) => {
      success = false;
      console.log(err, "err");
    });
  return success;
}

export async function updateSession(obj: any) {
  const url = `https://api2.cointopper.com/payment/update/${obj.sessionId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const json = await response.json();
  } catch (error) {
    console.error("Error updating session:", error);
  }
}
