"use client";

import Layout from "@/app/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FailPage() {
  const router = useRouter();
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-red-50">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! Something went wrong while processing your payment. Please try
          again after some time.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
          Go to Home
        </button>
      </div>
    </Layout>
  );
}
