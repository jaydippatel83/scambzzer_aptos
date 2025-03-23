"use client";  
import { useRouter } from "next/navigation"; 
import RadarBackground from "./RadarBackground";
import Link from "next/link";
 
export default function HomeComponent() {  

  return (
    <div className="container mx-auto max-w-5xl section-padding relative">
        <RadarBackground />
      <div className="flex flex-col items-center justify-center text-foreground transition duration-3"> 
        <h1 className="text-3xl lg:text-4xl font-bold text-center py-5">
        Your multichain shield against crypto scams. Spot and block threats before it’s too late!

        </h1>
        <p className="text-center text-lg">
        ScamBuzzer is a privacy-first platform that analyses users' emails, social interactions, and crypto transactions to detect and prevent scams without compromising data privacy, powered by TEE and Nillion's Blind Computation.

        </p>
        <p className="text-xl text-center mt-2 text-red-600">
          No more: Phishing, Social impersonation, and transactions with Scam Contracts!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10 w-full max-w-7xl px-4">
          {/* Card 1 */} 

          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
            Detects drainer smart contracts and verifies the authenticity of URLs.

            </p>
            <button  className="border hover:border-red-600 border-red-600 px-6 py-2 rounded-md text-red-600 hover:bg-red-400/10 hover:text-red-600 transition-colors">
            🛡️ Wallet Risk Scoring
            </button>
          </div>

          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
            Uses Nillion-powered LLM to scan content and prevent scams without ever exposing users’ data.
  </p>
            <button  className="border hover:border-red-600 border-red-600 px-6 py-2 rounded-md text-red-600 hover:bg-red-400/10 hover:text-red-600 transition-colors">
            📩 Private DM/Email Scam Detection
            </button>
          </div>

          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
            A blind, community contribution to report phishing links and wallet drainers fully anonymously. 

            </p>
            <button  className="border hover:border-red-600 border-red-600 px-6 py-2 rounded-md text-red-600 hover:bg-red-400/10 hover:text-red-600 transition-colors">
            🕵️‍♂️ Anonymous Scam Reporting
            </button>
          </div>

         
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-10 w-full max-w-7xl px-4">
        <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
            With this users can securely bookmark trusted wallet addresses which we we first encrypt through Nillion and then store in  Nillion’s secret vault to block copy-paste scams and prevent any malware from altering addresses.

            </p>
            <button  className="border hover:border-red-600 border-red-600 px-6 py-2 rounded-md text-red-600 hover:bg-red-400/10 hover:text-red-600 transition-colors">
            🔒 Address Poisoning Protection
            </button>
          </div>

           {/* Card 3 */}
           <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition bg-background z-10">
            <p className="mb-4">
              Get a browser extension that stops you from interacting with phishing URLs and explored contracts.
            </p>
            <Link href="https://drive.google.com/uc?export=download&id=1J4EZTl-iKOHAkL4uVfqVEjzHFU5CNhWe" className="px-4 py-2 text-sm text-foreground dark:text-green-300 border border-transparent rounded-md dark:hover:bg-green-400/10 transition-colors hover:bg-green-400/10" download>
                   Download
                </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
