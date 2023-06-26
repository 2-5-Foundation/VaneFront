'use client';

import Link from 'next/link';
import React from 'react'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Signer } from "@polkadot/types/types";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blue } from '@mui/material/colors';
import { useWalletContext } from '../../Context/store';
import { enablePolkadotExtension ,getSignerFromWallet} from '@/Component/wallet/pjs';


function Page() {

  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>();
  const [walletPresent, setwalletPresent] = useState<boolean>();
  const [selectedAcc, setSelectedAcc] = useState<InjectedAccountWithMeta>();

  const {account,setAccount,signer,setSigner,setIsWallet} = useWalletContext();

  const getAccounts = async() =>{
    // Check if the Wallet is installed
    const wallet:boolean = await enablePolkadotExtension();
    setwalletPresent(wallet);
    // Get Accounts
    const { web3Accounts, web3AccountsSubscribe } = await import(
      "@polkadot/extension-dapp"
    );

    const accounts = await web3Accounts();
    setAccounts(accounts);
    
  }

  const getTheSigner = async(account:InjectedAccountWithMeta) =>{
      // get the signer & update the context state of the signer and Account name
      const signer = await getSignerFromWallet(account);
      setSigner(signer)
  }

  const handleChange = (event: SelectChangeEvent) => {
    //@ts-ignore
    setAccount(event.target.value.address);
    //@ts-ignore
    getTheSigner(event.target.value)
    setIsWallet(true)
  };

  useEffect(()=>{
    getAccounts()

  },[])

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-2">
        <div className="flex flex-col items-center justify-around p-5">
            <h1 className="font-semibold text-3xl">You can use Vane without setting up a custodial Wallet</h1>
            <h1 className="font-sans font-light text-xl">Use the wallet feature if you are native to web3</h1>
        </div>
           
        <div>
            {
              walletPresent? 
              (
                <FormControl sx={{ m: 1, minWidth: 120,width:300,borderColor:'lightblue' }} size="medium">
                <InputLabel id="wallet">Choose Wallet Account</InputLabel>
                <Select
                  labelId="Choose-Wallet"
                  id="wallet"
                  //@ts-ignore
                  value={selectedAcc}
                  label="account"
                  onChange={handleChange}
                >
                  {accounts?.map((acc,id) =>(
                    //@ts-ignore
                    <MenuItem key={id} value={acc}>{acc.meta.name}</MenuItem>
                  ))}
                  
                </Select>
              </FormControl>
              ) 
              : (<Button variant="outlined" disabled>Choose Wallet Account</Button>)
            }
             
        </div>
        <div className="p-10">
          {
            walletPresent? (<Button size="small"><Link href="/">Return Home</Link></Button>) 
            : (<h1 className="font-sans font-light text-base">Wallet unavailable? Try out our <Button><Link href="/sign-in">Wallet-less Sign-In</Link></Button></h1>)
          }
        </div>

    </main>
  )
}

export default Page