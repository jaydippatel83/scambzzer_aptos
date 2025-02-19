import { NextRequest, NextResponse } from "next/server";


/**
 * Fetches the latest transactions for the provided account address from the Aptos API
 * and performs a dummy risk analysis by flagging transactions that exceed a defined gas usage threshold.
 *
 * @param accountAddress - The Aptos account address to analyze.
 * @returns A string summarizing the risk analysis.
 */
async function analyzeTransactions(accountAddress: string): Promise<string> {


  // Construct the URL to fetch the latest 10 transactions for the account.
  const url = `https://fullnode.testnet.aptoslabs.com/v1/accounts/${accountAddress}/transactions`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.status}`);
  }
  
  // Parse the JSON response.
  const txns = await response.json();
  console.log(txns[0].payload.function,"txns")
  
  if (!Array.isArray(txns)) {
    return "Unexpected response structure from Aptos API.";
  }

  let analysis = `Total transactions retrieved: ${txns.length}. `;

  const riskyFunction = `${txns[0].sender}::aptos_account::rotate_authenticatio_key_call`

  if(txns[0].payload.function == riskyFunction){
    analysis += `Transaction with function ${riskyFunction} detected. Risk: High gas usage.`;
  }else{
    analysis += `No risky transactions detected.`;
  }
   

  return analysis;

}

/**
 * POST handler for the API route.
 *
 * Expects a JSON payload with an "accountAddress" key.
 *
 * Example request body:
 * {
 *   "accountAddress": "0xca2bfa9640819889d54091653254f884e6aec21e"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { accountAddress } = await request.json();

    if (!accountAddress) {
      return NextResponse.json(
        { riskAnalysis: "Account address is required." },
        { status: 400 }
      );
    }

    const riskAnalysis = await analyzeTransactions(accountAddress);
    return NextResponse.json({ riskAnalysis }, { status: 200 });
  } catch (error) {
    console.error("Error analyzing transactions:", error);
    return NextResponse.json(
      { riskAnalysis: "Error analyzing transactions." },
      { status: 500 }
    );
  }
}