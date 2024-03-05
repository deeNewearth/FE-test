'use client'

import React from "react";
import Link from "next/link";
//import Logo from "./Logo";
//import Button from "./Button";
import Image from "next/image";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useWeb3 } from "../web3/context";
import truncateEthAddress from "truncate-eth-address";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal()

  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </>
  )
}

export function Navbar() {
  const { open:web3Open } = useWeb3Modal();
  const {isActive, address} = useWeb3();
  return (
    <>
      <div className="w-full h-20 sticky top-0">
        <div className="mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                priority
              />
              <span className="text-3xl">YieldNest</span>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-60"
                onClick={()=>web3Open()}
            >
              {(isActive && address)?truncateEthAddress(address):'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
