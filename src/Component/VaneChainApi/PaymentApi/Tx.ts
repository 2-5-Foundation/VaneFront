import { TicketDetails } from "@/Context/store";
import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { Signer } from "@polkadot/types/types";
import { Dispatch, SetStateAction } from "react";
//import "vane-types/api-augment"
// All Pallet Payment Transactions

//1. VanePay
export const vanePay = async(
    setFinalized:(finalized: boolean) =>void,
    api?: ApiPromise,signer?: Signer,account?:string,
    payee?:string,amount?:number,resolver?: string|null
    ) =>{
        if(api && signer && account && payee && amount ){

            const vanePayCall = api.tx.payment.vanePay(payee,amount,resolver);
            console.log('Submitting Vane Pay')
            // Sign and Send
            await vanePayCall.signAndSend(account,{signer},({status, events}) =>{
                if(status?.isFinalized){
                    console.log("Vane pay Finalized");
                    setFinalized(true)
                    events?.map(event =>[
                        console.log(event.toHuman())
                    ])
                }
            })

        }else{
            console.log("Some Params are missing in Vane Pay")
        }

      

}

//1.1 WalletLess VanePay 
export const vanePayWalletLess = async(
    setFinalized:(finalized: boolean) =>void,
    api?: ApiPromise,signer?: KeyringPair,account?:string,
    payee?:string,amount?:number,resolver?: string|null
    ) =>{
        if(api && signer && account && payee && amount ){

            const vanePayCall = api.tx.payment.vanePay(payee,amount,resolver);
            console.log('Submitting Vane Pay')
            // Sign and Send
            await vanePayCall.signAndSend(signer,({status, events}) =>{
                if(status?.isFinalized){
                    console.log("Vane pay Finalized");
                    setFinalized(true)
                    events?.map(event =>[
                        console.log(event.toHuman())
                    ])
                }
            })

        }else{
            console.log("Some Params are missing in Vane Pay")
        }

}


//2. VaneOrderPay
const vaneOrderPay = async() =>{

}

//3. ConfirmPayer
export const confirmPayer = async(
    setActiveStep:Dispatch<SetStateAction<number>>,
    setAllDone: Dispatch<boolean>,
    api?:ApiPromise,
    signer?: Signer,
    payer?:string,
    reference?:string
) =>{

    if(api && signer && payer && reference){

        const confirmPayCall = api.tx.payment.confirmPay('Payer',reference);

        await confirmPayCall.signAndSend(payer,{signer},({events,status})=>{
            if(status.isFinalized){
                console.log("Payer confirmed");
                setActiveStep((prevStep) => prevStep +1)
                setAllDone(true)
            }
        })

    }else{
        console.log("Some confirm payer params missing")
    }

}

//3.3 ConfirmPayer WalletLess
export const confirmPayerWalletLess = async(
    setActiveStep:Dispatch<SetStateAction<number>>,
    setAllDone: Dispatch<boolean>,
    api?:ApiPromise,
    signer?: KeyringPair,
    payer?:string,
    reference?:string
) =>{

    if(api && signer && payer && reference){

        const confirmPayCall = api.tx.payment.confirmPay('Payer',reference);

        await confirmPayCall.signAndSend(signer,({events,status})=>{
            if(status.isFinalized){
                console.log("Payer confirmed");
                setActiveStep((prevStep) => prevStep +1)
                setAllDone(true)
            }
        })

    }else{
        console.log("Some confirm payer params missing")
    }

}

//4. confirmPayee
export const confirmPayee = async(
    setpayeeTickets:Dispatch<SetStateAction<TicketDetails[]>>,
    payeeTickets:TicketDetails[],
    api?:ApiPromise,
    signer?: Signer,
    payee?:string,
    reference?:string
) =>{

    if(api && signer && payee && reference){

        const confirmPayCall = api.tx.payment.confirmPay("Payee",reference);

        await confirmPayCall.signAndSend(payee,{signer},({events,status})=>{
            if(status.isFinalized){
                console.log("Payee confirmed");
                payeeTickets.map(ticket =>{
                    if(ticket.reference === reference){
                        ticket.payeeConfirmed = true;
                        // update the state
                    }
                })
            }
        })

    }else{
        console.log("Some confirm payer params missing")
    }

}

//4.4 ConfirmPayee WalletLess

export const confirmPayeeWalletLess = async(
    setpayeeTickets:Dispatch<SetStateAction<TicketDetails[]>>,
    payeeTickets:TicketDetails[],
    api?:ApiPromise,
    signer?: KeyringPair,
    payee?:string,
    reference?:string
) =>{

    if(api && signer && payee && reference){

        const confirmPayCall = api.tx.payment.confirmPay("Payee",reference);

        await confirmPayCall.signAndSend(signer,({events,status})=>{
            if(status.isFinalized){
                console.log("Payee confirmed");
                payeeTickets.map(ticket =>{
                    if(ticket.reference === reference){
                        ticket.payeeConfirmed = true;
                        // update the state
                    }
                })
            }
        })

    }else{
        console.log("Some confirm payer params missing")
    }

}



//4. RevertFunds
const revertFunds = async() =>{
    
}