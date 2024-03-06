"use client";

import { useEffect } from "react";
import { useWeb3 } from "./context";
import { useReadContract, useReadContracts } from "wagmi";
import { formatUnits } from "viem";

import YNETH_ABI from "@/ynETH.abi";

const tokenAddress = "0x0091626e15caFd0F6Bc96dE7F12CEe444c0a212d";

const yNethContract = {
  address: tokenAddress,
  abi: YNETH_ABI,
} as const;

export function useTokenData(): {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: string;
  userBalance: string;
  tokenDecimals: number;
  status: "success";
}|{
    status: "pending"|"error";
} {
  const { isActive, address } = useWeb3();

  let contracts = [
    {
      ...yNethContract,
      functionName: "name",
      args: [] as string[],
    },
    {
      ...yNethContract,
      functionName: "symbol",
    },
    {
      ...yNethContract,
      functionName: "decimals",
    },
    {
      ...yNethContract,
      functionName: "totalSupply",
    },
  ];

  if (isActive && address) {
    contracts = [
      ...contracts,
      {
        ...yNethContract,
        functionName: "balanceOf",
        args: [address],
      },
    ];
  }

  const { data, isError } = useReadContracts({
    contracts,
  });

  if (isError) {
    return { status: "error" };
  }

  if (data) {
    const [name, symbol, decimals, supply, ...rest] = data;

    const tokenName =
      (name.status === "success" && (name.result as string)) || "";
    const tokenSymbol =
      (symbol.status === "success" && (symbol.result as string)) || "";
    const tokenDecimals =
      (decimals.status === "success" && (decimals.result as number)) || 0;

    const tokenSupply =
      (symbol.status === "success" &&
        formatUnits(supply.result as bigint, tokenDecimals)) ||
      "";

    let userBalance = "";

    if (isActive && address) {
      const [balance] = rest;

      userBalance =
        (balance.status === "success" &&
          formatUnits(balance.result as bigint, tokenDecimals)) ||
        "";
    }

    return {
      tokenAddress,
      tokenName,
      tokenSymbol,
      tokenSupply,
      userBalance,
      tokenDecimals,
      status: "success",
    };
  } else {
    return { status: "pending" };
  }
}
