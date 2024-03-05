import React from "react";
import Link from "next/link";
//import Logo from "./Logo";
//import Button from "./Button";
import Image from "next/image";

export function Navbar() {
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

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-60">
              Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
