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
    <div className="flex min-h-screen w-full flex-col items-center justify-evenly p-2 m-10">
      <div className="w-1/2 h-20 max-h-50 align-middle flex justify-center p-4 flex-col bg-slate-50">
        <h3 className="maxWidth font-light flex justify-center">All Pending Transactions to be confirmed</h3>
      </div>
      <Box sx={{marginTop:10}}>
        {
          payeeTickets?.map(ticket =>(
            <Card key={payeeTickets.indexOf(ticket)} variant='outlined' sx={{minWidth:"10ch",width:500, marginTop:2}}>
              <CardContent>
                <Alert sx={{padding:1,margin:2}} severity="info">
                  <AlertTitle sx={{fontSize:11}}>Payer Account</AlertTitle>
                      
                      <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                          {ticket.payer}
                      </Typography>
                    
                </Alert>
                <Alert sx={{padding:1,margin:2}} severity="info">
                  <AlertTitle sx={{fontSize:11}}>Reference No</AlertTitle>
                      
                      <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                          {ticket.reference}
                      </Typography>
                      
                </Alert>
              </CardContent>
              {
                ticket.payeeConfirmed? 
                  (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                      Confirmed successfully
                    </Alert>) 
                   :
                  (
                    <CardActions sx={{marginTop:-2}}>
                      <Button
                       sx={{fontSize:11}}
                       //@ts-ignore
                       onClick={()=>confirmPayeePay(ticket?.reference)}
                       >
                          Confirm Payment
                        </Button>
                    </CardActions> 
                  )
              }
             
            </Card>
          ))
        }
      </Box>
      
    </div>
  )
}

export default Page;