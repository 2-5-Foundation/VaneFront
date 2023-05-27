'use client';

import Link from 'next/link';
import React from 'react'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { enablePolkadotExtension, getSigner } from '../Component/wallet/pjs';
import { Signer } from "@polkadot/types/types";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blue } from '@mui/material/colors';


function Page() {

  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>();
  const [isWallet, setIsWallet] = useState<boolean>();
  const [signer, setSigner] = useState<Signer>();
  const [selectedAcc, setSelectedAcc] = useState<InjectedAccountWithMeta>();



  const getAccounts = async() =>{
    // Check if the Wallet is installed
    const wallet:boolean = await enablePolkadotExtension();
    setIsWallet(wallet);
    // Get Accounts
    const { web3Accounts, web3AccountsSubscribe } = await import(
      "@polkadot/extension-dapp"
    );

    const accounts = await web3Accounts();
    setAccounts(accounts);
    
  }

  const handleChange = (event: SelectChangeEvent) => {
    //@ts-ignore
    setSelectedAcc(event.target.value);
  };

  const getSigner = async(account:InjectedAccountWithMeta) =>{
      // get the signer & update the context state of the signer and Account name
      const signer = await getSigner(account);
  }

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
              isWallet? 
              (
                <FormControl sx={{ m: 1, minWidth: 120,width:300,borderColor:'lightblue' }} size="medium">
                <InputLabel id="demo-select-small-label">Choose Wallet Account</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  //@ts-ignore
                  value={selectedAcc}
                  label="Age"
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
            isWallet? (<Button size="small"><Link href="/">Return Home</Link></Button>) 
            : (<h1 className="font-sans font-light text-lg">Wallet unavailable? Try out our Wallet-less Sign-In</h1>)
          }
        </div>

    </main>
  )
}

export default Page