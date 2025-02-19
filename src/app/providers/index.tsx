"use client";

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

export const AptosWalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AptosWalletAdapterProvider plugins={[new PetraWallet()]}>
      {children}
    </AptosWalletAdapterProvider>
  );
};
