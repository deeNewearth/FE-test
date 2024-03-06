"use client";

import { useWeb3 } from "./components/web3/context";
import truncateEthAddress from "truncate-eth-address";
import { useTokenData } from "./components/web3/tokenData";
import { DepositEth } from "./components/web3/depositEth";

export default function Home() {
  const { isActive, address } = useWeb3();
  const tokenData = useTokenData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-10">
      <div className="mt-20">
        <p className="text-5xl">Yieldnest FE Test</p>
        {isActive && address && (
          <p className="text-lg">Your address: {truncateEthAddress(address)}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        <div className="border-4 border-indigo-500 rounded-xl p-2 max-w-80">
          <p className="text-2xl">Token Symbol</p>
          <p>{tokenData.status === "success" && tokenData.tokenSymbol}</p>
        </div>

        <div className="border-4 border-indigo-500 rounded-xl p-2 max-w-80">
          <p className="text-2xl">Token Name</p>
          <p>{tokenData.status === "success" && tokenData.tokenName}</p>
        </div>

        <div className="border-4 border-indigo-500 rounded-xl p-2 max-w-80">
          <p className="text-2xl">Token Decimals</p>
          <p>{tokenData.status === "success" && tokenData.tokenDecimals}</p>
        </div>
      </div>

      <div className="w-full">
        {isActive && address && (
          <p>
            <span className="text-2xl mr-3">User Balance </span>{" "}
            <span className="text-lg">
              {tokenData.status === "success" && tokenData.userBalance}{" "}
              {tokenData.status === "success" && tokenData.tokenSymbol}
            </span>
          </p>
        )}
        <p>
          <span className="text-2xl mr-3">Total Supply </span>{" "}
          <span className="text-lg">
            {tokenData.status === "success" && tokenData.tokenSupply}{" "}
            {tokenData.status === "success" && tokenData.tokenSymbol}
          </span>
        </p>
      </div>

      {isActive && address && <DepositEth />}
    </main>
  );
}
