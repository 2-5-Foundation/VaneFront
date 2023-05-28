import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

// All Pallet Payment Storage Queries

//1. Number of Vane txn account has made
const accountMultiTxns = async() =>{

}

//2. Allowed Signers to Verify Pending Multi-Txn
const allowedSigners = async() =>{

}

//3. Confirmed Signers for given reference of Pending Multi-Txn
const confirmedSigners = async() =>{

}

//4. orderTracker which is linked to pallet Order
const orderTracker = async() =>{

} 

//5. payeeTxn Ticket for keeping track pending Multi-Txn and referenc No;
const payeeTxnTicket = async() =>{

}

//6. payerTxn Ticket for keeping track pending Multi-Txn and referenc No;
const payerTxnTicket = async() =>{

}

//7. Resolver signer as one of the mechanism for handling disputes
const resolverSigner = async() =>{

}

//8. RevertedTxns by payee
const revertedTxnsPayee = async()=>{

}

//9. RevertedTxns by payer
const revertedTxnsPayer = async()=>{
    
}
