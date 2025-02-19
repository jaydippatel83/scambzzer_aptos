"use client";  
import { useRouter } from "next/navigation"; 
import RadarBackground from "./RadarBackground";

export default function HomeComponent() { 
  const router = useRouter(); 

  return (
    <div className="container mx-auto max-w-5xl section-padding relative">
        <RadarBackground />
      <div className="flex flex-col items-center justify-center text-foreground transition duration-3"> 
        <h1 className="text-3xl lg:text-4xl font-bold text-center py-5">
          Create an Agent that Detects, Alerts, and Protects Crypto Users from Scams!
        </h1>
        <p className="text-xl text-center mt-2 text-red-600">
          No more: Phishing, Social impersonation, and transactions with Scam Contracts!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10 w-full max-w-7xl px-4">
          {/* Card 1 */}
          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
              Protect and secure your brand by creating a commando agent at ScamBuzzer that stops your community from getting scammed.
            </p>
            <button className="px-4 py-2 t5ext-sm text-foreground dark:text-green-300 border border-transparent rounded-md dark:hover:bg-green-400/10 transition-colors hover:bg-green-400/10" onClick={() => router.push("/scan")}>
              Create Agent
            </button>
          </div>

          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
              Report scam contracts, phishing URLs, or social accounts and earn points for your contribution.
            </p>
            <button onClick={() => router.push("/dashboard/reports")} className="border hover:border-red-600 border-red-600 px-6 py-2 rounded-md text-red-600 hover:bg-red-400/10 hover:text-red-600 transition-colors">
              Report & Earn
            </button>
          </div>

          {/* Card 3 */}
          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
              Get a browser extension that stops you from interacting with phishing URLs and explored contracts.
            </p>
            <button className="px-4 py-2 t5ext-sm text-foreground dark:text-green-300 border border-transparent rounded-md dark:hover:bg-green-400/10 transition-colors hover:bg-green-400/10">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
