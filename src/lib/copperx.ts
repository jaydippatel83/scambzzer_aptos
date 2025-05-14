// import axios from "axios";

// function convertToUSDTUnits(amount: number): string {
//   return (amount * 100000000).toString();
// }

// export async function createCheckoutSession(data: any) {
//   const options = {
//     method: "POST",
//     url: "https://api.copperx.dev/api/v1/checkout/sessions",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authorization: `Bearer ${process.env.NEXT_PUBLIC_API_COPPERX}`,
//     },
//     data: {
//       submitType: "pay",
//       lineItems: {
//         data: [
//           {
//             priceData: {
//               currency: "eth",
//               productData: data.productData,
//               unitAmount: convertToUSDTUnits(0.001),
//               type: "one_time",
//               productId: process.env.NEXT_PUBLIC_PRODUCT_ID,
//             },
//             quantity: 1,
//           },
//         ],
//       },

//       afterCompletion: "redirect",
//       //   paymentSetting: {allowSwap: true, preferredChainId: 137},
//       afterCompletionConfirmMsg: "Payment success",
//       successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
//       cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//     },
//   };

//   const response = await axios.request(options);
//   return { sessionData: response.data };
// }

// export async function addSession(obj: any) {
//   var success = false;
//   await axios
//     .post("https://api2.cointopper.com/payment/update-checkout-session", obj)
//     .then(() => {
//       success = true;
//     })
//     .catch((err) => {
//       success = false;
//       console.log(err, "err");
//     });
//   return success;
// }

// export async function updateSession(obj: any) {
//   const url = `https://api2.cointopper.com/payment/update/${obj.sessionId}`;
//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(obj),
//     });
//     const json = await response.json();
//   } catch (error) {
//     console.error("Error updating session:", error);
//   }
// }

// export async function retrieveCheckoutSession(sessionId: any) {
//   const options = {
//     method: "GET",
//     url: `https://api.copperx.dev/api/v1/checkout/sessions/${sessionId}`,
//     headers: {
//       accept: "application/json",
//       authorization: `Bearer ${process.env.NEXT_PUBLIC_API_COPPERX}`,
//     },
//   };

//   const response = await axios.request(options);
//   return { data: response.data, error: null };
// }
