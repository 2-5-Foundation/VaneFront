import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Signer } from "@polkadot/types/types";
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
            vanePayCall.signAndSend(account,{signer},({status, events}) =>{
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

//3. ConfirmPay
export const confirmPay = async() =>{

}

//4. RevertFunds
const revertFunds = async() =>{
    
}