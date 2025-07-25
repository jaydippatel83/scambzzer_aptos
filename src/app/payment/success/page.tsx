"use client";

import Layout from "@/app/components/layout/Layout";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("cx_session_id");
  const [paymentDetails, setPaymentDetails] = useState() as any;
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!sessionId) return;
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/webhook/crypto?plan=2&sessionId=${sessionId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              setPaymentDetails(json?.data);
              toast.success("Subscription activated!");
              setTimeout(() => {
                redirect("/");
              }, 3000);
            } else {
              toast.error("Payment not verified yet.");
            }
          });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, [sessionId]);

  const items: OrderItem[] = [
    {
      id: paymentDetails && paymentDetails.id,
      name: "LifeTime - Plus Plan",
      quantity: 1,
    },
  ];

  function formatToLongDate(isoString: string): string {
    const date = new Date(isoString);
    // Month name long, day numeric (no leading zero), year numeric
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // en-US will give "June 9, 2025"
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="min-h-screen bg-white">
      {paymentDetails && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your crypto payment has been processed successfully. Order details
              and transaction information are below.
            </p>
          </div>

          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Order Details
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Order Number
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {
                      paymentDetails?.paymentIntent?.paymentReceipt
                        .receiptNumber
                    }
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Order Date
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatToLongDate(paymentDetails.createdAt)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Payment Method
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {paymentDetails.paymentIntent.paymentMethodTypes}(
                    {paymentDetails.paymentIntent.currency})
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Transaction Hash
                  </h3>
                  <p className="text-sm font-mono text-gray-900 break-all">
                    {
                      paymentDetails?.paymentIntent?.transactions[0]
                        .transactionHash
                    }
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Items Purchased
                </h3>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start pb-6 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      ${paymentDetails.amountFee}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${paymentDetails.amountSubtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${paymentDetails.amountDetails.amountTax}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total Paid</span>
                  <span className="text-green-500">
                    ${paymentDetails.amountTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading payment details...</p>
    </div>
  </div>
);

const CoperxSuccess = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <PaymentSuccessContent />
      </Suspense>
    </Layout>
  );
};

export default CoperxSuccess;
