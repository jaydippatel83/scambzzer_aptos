"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmStatusPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token_hash = urlParams.get("token_hash");
    const type = urlParams.get("type") || "email";

    if (!token_hash) {
      setMessage("❌ Invalid confirmation link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/confirm`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token_hash, type }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setMessage("✅ Email confirmed! You can now go to the homepage.");
          setConfirmed(true);
        } else {
          setMessage(`❌ Confirmation failed: ${data.error}`);
        }
      } catch (err) {
        setMessage("⚠️ Something went wrong during email confirmation.");
      }
    };

    verifyEmail();
  }, []);

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-semibold mb-4">{message}</h1>
      {confirmed && (
        <button
          onClick={goHome}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      )}
    </div>
  );
}
