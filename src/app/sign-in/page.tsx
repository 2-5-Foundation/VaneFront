'use client'

import React,{useState} from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useWalletContext, useWalletLessContext } from '@/Context/store';
import Link from 'next/link';
import {naclEncrypt,naclDecrypt,randomAsU8a} from '@polkadot/util-crypto';
import {u8aToString,stringToU8a,u8aToHex,hexToString, hexToU8a} from '@polkadot/util'
import { sha256AsU8a,mnemonicGenerate,sr25519PairFromSeed,cryptoWaitReady } from '@polkadot/util-crypto';
import keyring from '@polkadot/ui-keyring';
import { enablePolkadotExtension } from '@/Component/wallet/pjs';
//Material UI
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import { Signer } from '@polkadot/types/types';
import { KeyringPair } from '@polkadot/keyring/types';


//Custom Data types
export interface Stored {
  secret:string,
  data:{name:string,email?:string,address:string,signer:KeyringPair}
}


function Page() {
  const {setWalletLess,data} =  useWalletLessContext();
  const{setAccountPair,setSigner,setIsWallet,setPair} = useWalletContext()

  
  //Router
  const router = useRouter();
  //state
  const [walletPresent, setWalletPresent] = useState<boolean>(false);

  //Log In/SignIn
  const SignIn = () =>{
    if(data?.passcode){
        // Retrive the signerObject
        const hashedPasscode = sha256AsU8a("Lukashi69");
        const passcode = JSON.stringify(hashedPasscode);
        const storedData = localStorage.getItem(passcode);
        console.log("Retrived Stored data "+storedData);
        // Decrypt the data object
        const u8StoredData = hexToU8a(storedData);
        const nonce = stringToU8a("VaneWalletLessSystemSalt")
        const decryptedData = naclDecrypt(u8StoredData,nonce,hashedPasscode);
        const retrivedData:Stored = JSON.parse(u8aToString(decryptedData));
        // Update the context state
        setAccountPair(retrivedData.data.address);
        setPair(retrivedData.data.signer);
        setWalletLess({name:retrivedData.data.name})
        setWalletLess({email:retrivedData.data.email})
        //Go Home
        router.push("/")
    }
    
  }

  //Check Passcode length
  const checkPasscode =()=>{
    if(data?.passcode){
      if(data.passcode.length < 7){
        return (
          <div>
            <Alert severity="error">Passcode length too short</Alert>
          </div>
        )
      }else{
        return (
          <div>
            <Alert severity="success">Passcode looks great, PLEASE DONT FORGET</Alert>
          </div>
        )
      }
    }
  }

  // Generate Account
  const generateAccount =async()=>{
    cryptoWaitReady().then(async()=>{

      if(data?.name && data?.passcode ){

        keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
        const passcode = sha256AsU8a(data.passcode);
        const mnemonic = mnemonicGenerate(12);
        const { pair, json } = keyring.addUri(mnemonic,u8aToString(passcode), { name:data.name});
        const KeyringPair = pair;

        //Check if the extension is available
        const wallet:boolean = await enablePolkadotExtension();
        setWalletPresent(wallet)
        
        //update the context
        setAccountPair(KeyringPair.address);
        setPair(KeyringPair);

        const StoredData:Stored = {
          secret:mnemonic,
          data:{name:data.name,email:data.email,address:KeyringPair.address,signer:KeyringPair}
        }
  
        const storedData:string = JSON.stringify(StoredData);
            
        //Store to the local storage
        storeDetails(storedData);
        setIsWallet(false);
        router.push("/")
  
      }
    })
    
    
  }

  // Store local Storage
  const storeDetails =(storedData:string)=>{

    if(data?.passcode){
      //Hash the password
      const passcode = sha256AsU8a(data.passcode);
      //Encrypt the secret
      const u8Data = stringToU8a(storedData);
      const nonce = stringToU8a("VaneWalletLessSystemSalt")
      const {encrypted}= naclEncrypt(u8Data,passcode,nonce);
      //Transform the encrypted to Hex
      const hexEncrypted = u8aToHex(encrypted);
      //Store to Local storage Hex(Passcode), hexEcrypted
      const hexPasscode = u8aToHex(passcode);
      localStorage.setItem(JSON.stringify(hexPasscode),JSON.stringify(hexEncrypted));
     
      console.log("data stored")
    }
    
  }



  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-1 sm:p-2">

      <Box  className="w-full border-s-slate-50 sm:p-5 sm:w-1/3 flex flex-col align-middle justify-around" sx={{display:"flex",flex:"column"}}>
        <h1 className="flex align-middle justify-center">Sign In</h1>
       
        <TextField
           required
           size='small'
           id="Passcode"
           label="Passcode"
           onChange={(e) => setWalletLess({passcode:e.target.value})}
           className="my-5"
        />
        <Button size="small" variant='outlined' onClick={()=>SignIn()}>Sign In</Button>

      </Box>


      <Box  className="w-full sm:p-5 my-5 bg-slate-50 sm:w-1/3 flex flex-col align-middle justify-around" sx={{display:"flex",flex:"column"}}>
        <h1 className="sm:my-5 flex align-middle justify-center text-xs sm:text-xl">New user</h1>
        <h1 className="sm:my-5 flex align-middle justify-center text-xs sm:text-base">SignUp using Email and get your account ready and later to be claimed</h1>
        <TextField
           size='small'
           id="Username"
           label="Username"
           onChange={(e) => setWalletLess({name:e.target.value})}
          />
        <TextField
           required
           size='small'
           id="Email"
           label="Email"
           onChange={(e) => setWalletLess({email:e.target.value})}
           className="my-5"
        />
         <TextField
           required
           size='small'
           id="Passcode"
           label="Passcode"
           className="mb-5"
           onChange={(e) => setWalletLess({passcode:e.target.value})}
        />
        {checkPasscode()}
        <Button className="mt-3" size="small" variant='outlined' onClick={()=> generateAccount()}>Sign Up</Button>
      </Box>
    </main>
  )
}

export default Page