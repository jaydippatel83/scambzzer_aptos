"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/lib/copperx";
import LoginModal from "./auth/Login";
import toast from "react-hot-toast";

const PricingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  
  const checkoutProduct = async (productId: number, plan: number) => {
    try {
      setSelectedProductId(productId as any);
      const email = localStorage.getItem("scambuzzer_email");

      if (!email) {
        // Save selected plan in localStorage
        localStorage.setItem("selected_plan", JSON.stringify(plan));
        // Show login modal 
        setIsLoginModalOpen(true);
        return;
      }
    
      startPayment(productId);
    } catch (error) {
      console.log(error);
    }
  };

  const startPayment = async (productId: number) => {
  
    const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&metadata_plan=2&redirect_url=${process.env.NEXT_PUBLIC_BASE_URL}`;
  
    window.location.href = checkoutUrl;
  };

  const checkoutWeb3Payment = async (data: any) => {
    try {
      const { sessionData } = await createCheckoutSession({
        data,
      });
      window.location.href = sessionData.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCredentialResponse = async (response: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      }
    );

    const data = await res.json();

    localStorage.setItem("scambuzzer_email", JSON.stringify(data.user.email));
    toast.success("Logged in successfully!");

    const savedPlan = localStorage.getItem("selected_plan");
    if (savedPlan) {
      startPayment(selectedProductId as any);
      localStorage.removeItem("selected_plan");
    }
  
    setIsLoginModalOpen(false);
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-12">
          Choose Your Protection Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-4">Free</h3>
            <div className="text-4xl font-bold mb-4">
              $0<span className="text-gray-500 text-lg">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Scam Link Lookup (15 sites/month)</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Scam Case Studies</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x w-5 h-5 text-red-500 mt-1"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
                <span className="text-gray-500">
                  Auto-Warning on Scam Sites
                </span>
              </li>
            </ul>
            <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full transition-colors">
              Download Free
            </button>
          </div>

          {/* Plus Monthly Plan */}
          <div className="bg-white border-2 border-scambuzzer-text rounded-2xl p-8 hover:shadow-lg transition-shadow relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-scambuzzer-text text-black bg-green-500 px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-4">Plus Monthly</h3>
            <div className="text-4xl font-bold mb-4">
              $9<span className="text-gray-500 text-lg">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Unlimited Scam Link Lookup</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Auto-Warning on Scam Sites</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Real-Time Protection</span>
              </li>
            </ul>
            <button className="w-full py-3 px-4 bg-scambuzzer-text bg-green-500 hover:bg-green-600 text-black rounded-full transition-colors">
              Get Started
            </button>
          </div>

          {products.map((product: any) => {
           
            return (
              <div
                key={product?.product_id}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4">Lifetime</h3>

                <div className="text-4xl font-bold mb-4">
                  $69<span className="text-gray-500 text-lg">/once</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Everything in Plus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Early Access Features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check-circle w-5 h-5 text-green-500 mt-1"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Save 55% vs Monthly</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button
                    className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors text-sm font-semibold shadow-md"
                    onClick={() => checkoutProduct(product.product_id, 2)}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay with Card"}
                  </button>

                  <button
                    className="flex-1 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors text-sm font-semibold shadow-md"
                    onClick={() =>
                      checkoutWeb3Payment({
                        productData: {
                          metadata: {
                            start_date: product.created_at,
                            end_date: "",
                            promocode: "",
                            product: "Scambuzzer",
                            email: "web3wizard@gmail.com",
                            name: product.name,
                            url: process.env.NEXT_PUBLIC_BASE_URL,
                          },
                          name: product.name,
                          description: product.description,
                          unitLabel: "",
                          url: process.env.NEXT_PUBLIC_BASE_URL,
                        },
                      })
                    }
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay with Crypto"}
                  </button>
                </div>
                 <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} handleCredentialResponse={handleCredentialResponse}/>
              </div>
            );
          })}

          {/* Lifetime Plan */}
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
