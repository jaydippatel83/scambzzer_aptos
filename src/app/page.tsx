"use client";

import { useState, FormEvent } from 'react';

type Transaction = {
  version: number;
  gas_used: number;
  // Extend this as needed based on your backend response.
};

export default function Home() {
  const [accountAddress, setAccountAddress] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  // Should match the threshold used in your backend risk analysis logic.
  const riskThreshold = 1000;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRiskAnalysis('');
    setTransactions([]);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountAddress })
      });
      const data = await res.json();
      setRiskAnalysis(data.riskAnalysis);
      // Expecting a "transactions" array in the API response.
      setTransactions(data.transactions || []);
    } catch (err) {
      setRiskAnalysis('Error fetching transaction data.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Search Box */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Search Account Address
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Aptos account address"
            value={accountAddress}
            onChange={(e) => setAccountAddress(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {riskAnalysis && (
          <div className="mt-4 bg-blue-100 text-blue-700 p-3 rounded">
            <strong>Risk Analysis: </strong>
            {riskAnalysis}
          </div>
        )}
      </div>

      {/* Transaction List */}
      {transactions.length > 0 && (
        <div className="bg-white mt-8 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h3 className="text-xl font-bold text-center mb-4">Transactions</h3>
          <ul className="divide-y divide-gray-200">
            {transactions.map(txn => (
              <li key={txn.version} className="py-3 flex justify-between items-center">
                <div>
                  <p>
                    <span className="font-semibold">Version:</span> {txn.version}
                  </p>
                  <p>
                    <span className="font-semibold">Gas Used:</span> {txn.gas_used}
                  </p>
                </div>
                {txn.gas_used > riskThreshold && (
                  <span className="text-red-600 font-bold">Risk</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}