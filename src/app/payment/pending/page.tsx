'use client';

import React,{useEffect, useState} from 'react'
import { getPayeeTickets } from '@/Component/VaneChainApi/PaymentApi/Query';
// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// CONTEXT
import { useChainApiContext, useWalletContext,useTxnTicketContext, TicketDetails } from '@/Context/store';
import { payerTxnTicket } from '@/Component/VaneChainApi/PaymentApi/Query';
import { ApiPromise } from '@polkadot/api';
import { confirmPayee } from '@/Component/VaneChainApi/PaymentApi/Tx';

function Page() {
  const {account, signer}  = useWalletContext();
  const {api} = useChainApiContext();


  const [payeeTickets, setPayeeTickets] = useState<TicketDetails[]>([]);
  const [confirmed, setConfirmed] = useState<boolean>();

  const getAllPayeeTickets = async()=>{
      getPayeeTickets(setPayeeTickets,api,account?.address)
  }

  const confirmPayeePay = async(refNo:string) =>{
     await confirmPayee(
          setPayeeTickets,
          payeeTickets,
          api,
          signer,
          account?.address,
          refNo
      );
      
  }

  useEffect(()=>{
    getAllPayeeTickets()
  },[payeeTickets])

  return (
    <div className=" p-2 flex min-h-screen w-full flex-col items-center justify-evenly sm:p-2 sm:m-10">
      <div className="w-full sm:w-1/2 h-20 max-h-50 align-middle flex justify-center p-4 flex-col bg-slate-50">
        <h3 className="maxWidth font-light flex justify-center">All Pending Transactions to be confirmed</h3>
      </div>
      <Box className="mt-3 sm:mt-10 w-full sm:w-auto">
        {
          payeeTickets?.map(ticket =>(
                <Alert key={payeeTickets.indexOf(ticket)} className="w-full sm:w-100vw" sx={{margin:1}} severity="info">
                 
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        <Typography className="text-xs sm:text-sm font-semibold" >Payer Address</Typography> {ticket.payer}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    <Typography className="text-xs sm:text-sm font-semibold" >Amount</Typography> {ticket.amount}
                    </Typography>
                    <Button
                      size='small'
                      //@ts-ignore
                      onClick={()=>confirmPayeePay(ticket?.reference)}
                      >
                        Confirm Payment
                      </Button>
                    
                </Alert>
          ))
        }
      </Box>
      
    </div>
  )
}

export default Page;