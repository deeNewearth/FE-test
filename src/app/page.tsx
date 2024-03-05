'use client'

import { useWeb3 } from "./components/web3/context";
import truncateEthAddress from "truncate-eth-address";

export default function Home() {
  const { isActive, address } = useWeb3();
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
          <p>ynETH</p>
        </div>

        <div className="border-4 border-indigo-500 rounded-xl p-2 max-w-80">
          <p className="text-2xl">Token Symbol</p>
          <p>ynETH</p>
        </div>

        <div className="border-4 border-indigo-500 rounded-xl p-2 max-w-80">
          <p className="text-2xl">Token Symbol</p>
          <p>ynETH</p>
        </div>
      </div>

      <div className="w-full">
        {isActive && address && (
          <p>
            <span className="text-2xl mr-3">User Balance </span>{" "}
            <span className="text-lg">0.00011 ynETH</span>
          </p>
        )}
        <p>
          <span className="text-2xl mr-3">Total Supply </span>{" "}
          <span className="text-lg">16713.989898989898 ynETH</span>
        </p>
      </div>

      <div className="content-start min-w-80">
        <label className="text-2xl">Deposit ETH</label>

        <input
          type="text"
          id="large-input"
          className="my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Deposit
        </button>
      </div>
    </main>
  );
}
