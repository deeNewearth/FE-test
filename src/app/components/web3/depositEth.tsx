"use client";

import { BaseError, useWriteContract } from "wagmi";
import { yNethContract } from "./tokenData";
import { useWeb3 } from "./context";
import { useEffect, useState } from "react";
import { parseEther } from "viem";

export function DepositEth() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { address } = useWeb3();
  const [amount, setAmount] = useState<string>("");

  useEffect(()=>{
    setAmount("");
  },[hash]);

  return (
    <>
      <div className="content-start min-w-80">
        <label className="text-2xl">Deposit ETH</label>

        <input
          value={amount}
          onChange={(e) =>
            setAmount((e.target.value || "").replace(/[^0-9\.]+/g, ""))
          }
          type="text"
          id="large-input"
          className="my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>

        {error && (
          <div className="text-red-800">
            Error: {(error as BaseError).shortMessage || error.message}
          </div>
        )}

        <button
          disabled={!amount || isPending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-1"
          onClick={() => {
            if (!address) {
              console.error("address is undefined");
              return;
            }

            console.log("sending deposit");

            writeContract({
              ...yNethContract,
              functionName: "depositETH",
              args: [address],
              //address,
              value: parseEther(amount),
            });
          }}
        >
          {isPending ? "In progress ..." : "Deposit"}
        </button>
      </div>
      {hash && <div>Transaction Hash: {hash}</div>}
    </>
  );
}
