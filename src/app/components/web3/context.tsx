'use client'

import constate from "constate";
import { useWeb3ModalEvents } from '@web3modal/wagmi/react'
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'


function useWeb3Context(){
    const events = useWeb3ModalEvents();
    const { address, isConnecting, isDisconnected, chainId } = useAccount();

    useEffect(()=>{
        console.debug('got web3 event', JSON.stringify(events.data));
    },[events]);

    useEffect(()=>{
        console.debug('got account event', JSON.stringify({address, isConnecting, isDisconnected, chainId}));
    },[address, isConnecting, isDisconnected, chainId]);

    return {
        address,
        chainId,
        isActive: !isDisconnected
    }
}

export const [Web3StatusProvider, useWeb3] = constate(useWeb3Context);

