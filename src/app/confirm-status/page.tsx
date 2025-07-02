"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmStatusPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token_hash = urlParams.get("code"); // 'code' from URL acts as token_hash
    const type = "email"; // Required for verifyOtp

    if (!token_hash) {
      setMessage("❌ Invalid confirmation link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/confirm`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token_hash, type }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setMessage("✅ Email confirmed! You can now log in to ScamBuzzer.");
        } else {
          setMessage(`❌ Confirmation failed: ${data.error}`);
        }
      } catch (err) {
        setMessage("⚠️ Something went wrong during email confirmation.");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-semibold">{message}</h1>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-black text-white rounded"
      >
        Go to Home
      </button>
    </div>
  );
}
