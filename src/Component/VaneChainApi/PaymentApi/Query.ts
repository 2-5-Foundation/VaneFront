import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { TicketDetails } from "@/Context/store";

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
export const payeeTxnTicket = async(api?:ApiPromise, account?:string) =>{
    const data =await api?.query.payment.payeeTxnTicket(account);
    console.log(data?.toHuman())
}

//6. payerTxn Ticket for keeping track pending Multi-Txn and referenc No;
export const payerTxnTicket = async(
    ticketDetails:(details:TicketDetails)=>void,
    api?:ApiPromise,
    payer?:string,
    payee?:string

    ) =>{
    if(api && payer && payee){
        console.log("Query payer ticket")
        const data =await api.query.payment.payerTxnTicket(payer, payee);
        //@ts-ignore
        console.log("Ticket "+ data?.toHuman()[0])
        const details:TicketDetails = {
             //@ts-ignore
             payee: data?.toHuman()[0].payee,
             //@ts-ignore
             reference: data?.toHuman()[0].referenceNo,
             //@ts-ignore
             amount: data?.toHuman()[0].amount
        };
        ticketDetails(details);

    }else{
        console.log("Missing some Params in payer ticket query ")
    }
    
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

//10. Get Payee TXN Tickets
export const getPayeeTickets = async(
    payeeTickets:(tickets:TicketDetails[])=>void,
    api?:ApiPromise,
    payee?:string

) =>{

    if(api && payee){
        const tickets = await api.query.payment.payeeTxnTicket(payee);       
        console.log(tickets.toHuman())
        let alltickets:TicketDetails[] =[];
        //@ts-ignore
        tickets?.toHuman().map(ticket =>{
            const data:TicketDetails = {
                payer:ticket.payer,
                reference: ticket.referenceNo
            };
            alltickets.push(data);
        })
        payeeTickets(alltickets)
        
    }
}