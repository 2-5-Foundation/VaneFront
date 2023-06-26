'use client';

import { ApiPromise, WsProvider } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { Signer } from "@polkadot/types/types";
import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";

type Props = {
    children: ReactNode
}

// Wallet Context
interface WalletInfo {
    account?: InjectedAccountWithMeta|string;
    setAccount: Dispatch<InjectedAccountWithMeta|string>;
    signer?: Signer;
    setSigner: Dispatch<Signer>
    pair?:KeyringPair;
    setPair: Dispatch<KeyringPair>;
    isWallet:boolean;
    setIsWallet:Dispatch<boolean>;
}

const defaultStateWallet:WalletInfo = {
    account: undefined,
    setAccount: (account:InjectedAccountWithMeta|string) =>{return },
    signer: undefined,
    setSigner: (signer:Signer) => {return},
    pair: undefined,
    setPair: (pair: KeyringPair) => {return},
    isWallet: false,
    setIsWallet: (v:boolean) => {return}
}

const WalletContext = createContext<WalletInfo>(defaultStateWallet);

export const WalletContextProvider = ({children}:Props) =>{
    const [account, setAccount] = useState<InjectedAccountWithMeta|string>();
    const [signer, setSigner] = useState<Signer>();
    const [pair, setPair] = useState<KeyringPair>();
    const [isWallet, setIsWallet] =  useState<boolean>(false)

    return (
        <WalletContext.Provider value={{account,setAccount,signer,setSigner,pair,setPair,isWallet,setIsWallet}}>
            {children}
        </WalletContext.Provider>
    )
};
export const useWalletContext = () => useContext(WalletContext);

//-------------------------------------------------------------//
// Chain Api
interface ChainApiInterface {
    api?:ApiPromise;
    fetchChainApi: () => void;
}
const defaultChainApiState:ChainApiInterface = {
    api: undefined,
    fetchChainApi:()=>{return}
}

const ChainApiContext = createContext<ChainApiInterface>(defaultChainApiState);

export const ChainApiContextProvider = ({children}:Props) =>{
    const [chainApi, setChainApi] = useState<ApiPromise>();
    
    const fetchChainApi = async() =>{
        let wsProvider = new WsProvider('ws://127.0.0.1:9944');
        let chain_api = await ApiPromise.create({provider:wsProvider});
        chain_api.isReady
        setChainApi(chain_api);
        console.log("Chain Connected")
    }

    return (
        <ChainApiContext.Provider value={{fetchChainApi,api:chainApi}}>
            {children}
        </ChainApiContext.Provider>
    )
};

export const useChainApiContext = () => useContext(ChainApiContext);

// Payee Confirming Status ( TXN TICKET)
export interface TicketDetails {
    payee?:string,
    payer?:string, //Currently is only payer, payee and reference and no multiID.
    accountMultiId?:string,
    reference?:string,
    payeeConfirmed?:boolean,
    amount?:number
}


export interface TxnTicket {
    ticketDetails?: TicketDetails;
    finalized: boolean;
    payeeConfirmed:boolean,
    setTicketDetails: Dispatch<TicketDetails>;
    setFinalized: Dispatch<boolean>;
    setPayeeConfirmed: Dispatch<boolean>;
    setPayee1Confirmed:Dispatch<boolean>
}

const defaultStateTicket:TxnTicket = {
    ticketDetails: undefined,
    finalized:false,
    payeeConfirmed: false,
    setTicketDetails: (account?:TicketDetails) =>{return },
    setFinalized: (finalized:boolean) =>{return},
    setPayeeConfirmed: (confirmed:boolean) =>{return},
    setPayee1Confirmed: (confirmed:boolean) => {return}
}

const TxnTicketContext = createContext<TxnTicket>(defaultStateTicket);


export const TxnTicketContextProvider = ({children}:Props) =>{
    const [ticketDetails, setTicketDetails] = useState<TicketDetails>();
    const [finalized, setFinalized] = useState<boolean>(false);
    const [payeeConfirmed, setPayeeConfirmed] = useState<boolean>(false) // This is a value for payee confirmation in the payment page
    const [payee1Confirmed, setPayee1Confirmed] = useState<boolean>(false) // This is a  value for payee confirmation in the payment/pending page
    return (
        <TxnTicketContext.Provider value={
            {
                setTicketDetails,setFinalized,
                setPayeeConfirmed,setPayee1Confirmed,
                payeeConfirmed,
                finalized, 
                ticketDetails:{
                    payee:ticketDetails?.payee,
                    accountMultiId:ticketDetails?.accountMultiId,
                    reference:ticketDetails?.reference,
                    payeeConfirmed:payee1Confirmed
                }
            }
            }>
            {children}
        </TxnTicketContext.Provider>
    )
};

export const useTxnTicketContext = () => useContext(TxnTicketContext);

//Local Storage
export interface LocalStorage {
    privateKey:string;
    email:string;
}

// Email account
export interface UserDetails {
    name?: string;
    email?: string;
    passcode?:string;
}

const defaulUserDetails:UserDetails ={
    name: undefined,
    email: undefined,
    passcode: undefined,
}

export interface WalletLess {
    data?:UserDetails;
    setWalletLess:Dispatch<UserDetails>;
}

const defaultWalletLess:WalletLess ={
    data:undefined,
    setWalletLess: (v:UserDetails) =>{return}
}

export const WalletLessContext = createContext(defaultWalletLess);

export const WalletLessProvider =({children}:Props)=>{
    const [userDetails,setUserDetails] = useState<UserDetails>(defaulUserDetails);

    const setWalletLess = (v:UserDetails) =>{
        setUserDetails({...userDetails,...v})
    }

    return (
        <WalletLessContext.Provider value={{data:userDetails, setWalletLess}}>
            {children}
        </WalletLessContext.Provider>
    )
}

export const useWalletLessContext =() => useContext(WalletLessContext);
