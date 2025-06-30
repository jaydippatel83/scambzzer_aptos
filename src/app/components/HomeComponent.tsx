import React from "react";
import PricingPage from "./Plan";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Your Shield Against <br></br> Digital Scams
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-bold">
              In the digital era, most realize they have been scammed only after
              it happens. ScamBuzzer detects, alerts, and protects you before
              it&apos;s too late to act.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/scambuzzer/gdaphenpldlcgghlekhhbdilgmblcmlh"
              target="_blank"
            >
              <button className="bg-scambuzzer-text font-black text-black bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-lg inline-flex items-center gap-2 transition-colors">
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
                  className="lucide lucide-download w-5 h-5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Add to Chrome & Brave
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Protection Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">
            Stay protected from 7+ ways a scammer executes a phishing scam
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Lookalike Website", color: "red" },
              { title: "Malware Scripts", color: "blue" },
              { title: "Domain Trust History", color: "green" },
              { title: "URL Encoding", color: "purple" },
              { title: "Malicious Redirections", color: "orange" },
              { title: "Community Discussion Access", color: "red" },
              { title: "Early Access to New Features", color: "green" },
              { title: "Special Supporter Badge", color: "blue" },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-8 h-8 mb-4 bg-${feature.color}-500/20 rounded-full flex items-center justify-center`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 text-${feature.color}-500`}
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  Protecting you from sophisticated scam attempts.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">
            The Rising Threat of Phishing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl font-black text-green-500 text-scambuzzer-text mb-2">
                $2.3B+
              </div>
              <p className="text-gray-600">
                Lost to hacks and scams in 2024 alone
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl font-black text-scambuzzer-text text-green-500 mb-2">
                $450M+
              </div>
              <p className="text-gray-600">
                Lost to phishing scams specifically
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl font-black text-scambuzzer-text text-green-500 mb-2">
                #1
              </div>
              <p className="text-gray-600">
                Phishing remains the most effective attack vector
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl font-black text-scambuzzer-text text-green-500 mb-2">
                24/7
              </div>
              <p className="text-gray-600">
                Protection needed in digital scams, crypto, and beyond
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingPage />

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to secure your crypto journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users protecting their assets with ScamBuzzer.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/scambuzzer/gdaphenpldlcgghlekhhbdilgmblcmlh"
              target="_blank"
            >
              <button className="bg-scambuzzer-text text-black bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-lg font-medium inline-flex items-center gap-2 transition-colors">
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
                  className="lucide lucide-download w-5 h-5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Now
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
