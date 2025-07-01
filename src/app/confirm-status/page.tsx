"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmStatusPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch("/auth/confirm");

        const data = await res.json();

        if (data.success) {
          setMessage("✅ Email confirmed! Redirecting to homepage...");
          setTimeout(() => {
            router.push("/");
          }, 3000);
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
    </div>
  );
}
