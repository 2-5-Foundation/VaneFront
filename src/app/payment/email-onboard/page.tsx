'use client'


import React,{useEffect,useState} from 'react'
import Link from 'next/link';
// Material UI
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
// Card
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AlertTitle from '@mui/material/AlertTitle';

import HandshakeIcon from '@mui/icons-material/Handshake';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
// Alert Feedback
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// Form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// ---------TX & QUERIES--------------------------
import {confirmPayerWalletLess, vanePayWalletLess } from '@/Component/VaneChainApi/PaymentApi/Tx';
// CONTEXT
import { useChainApiContext, useWalletContext,useTxnTicketContext, TicketDetails } from '@/Context/store';
import { payerTxnTicket } from '@/Component/VaneChainApi/PaymentApi/Query';
import { ApiPromise } from '@polkadot/api';
// txn
import { confirmPayer } from '@/Component/VaneChainApi/PaymentApi/Tx';


//------------------------------------------------


function Page() {
  // CONTEXT
  const {account,accountPair, signer, pair,isWallet}  = useWalletContext();
  const {api} = useChainApiContext();
  const {setTicketDetails,ticketDetails,finalized,setFinalized, payeeConfirmed, setPayeeConfirmed} = useTxnTicketContext();
  //---------------------------------------------

   // Confirm Enum
   enum Confirm {
    Payee = "Payee",
    Payer = "Payer"
  };
  //-------------------------------------------//

  // Resolver Enum
  enum Resolver {
    null = "null",
    LegalTeam = "LegalTeam",
    Governance = "Governance"
  }

   // Vane Confirm
   type TxnTicket = {
    payee: string,
    reference: string,
    SharedAccount: string
  }

  // Vane Pay Txn params for wallet users
  type VanePayParams = {
    payee:string,
    amount: number,
    resolver: Resolver |null;
  }
  // Defaul Value
  const payWalletParams:VanePayParams ={
    payee:"",
    amount: 0,
    resolver: null
  }
  //---------------------------------------------------//


  const [activeStep, setActiveStep] = useState(0);
  // TXN
  const [allDone, setAllDone] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<Confirm>();
  const [resolver, setResolver] =  useState<Resolver>()
  const [payerStatus, setPayerStatus] = useState<boolean>(false);
  // VanePayWallet
  const [vanePayWalletParams, setVanePayWalletParams] = useState<VanePayParams>(payWalletParams);
  
  const handleWalletParams = (param:VanePayParams) =>{
      setVanePayWalletParams({...vanePayWalletParams,...param})

  }

  console.log(vanePayWalletParams)
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const confirmationSubscriber = async() =>{
    
    let ticket = ticketDetails;
    if(api && ticket){
      console.log("reference No: "+ ticket.reference)
      const unsubscribe = await api.query.payment.confirmedSigners(ticket.reference,(confirmation:string[])=>{
        console.log("waiting for Payee confirmation")    
        if(confirmation.length != 0){
                console.log("Payee already confirmed")
                console.log(confirmation)
                setPayeeConfirmed(true)
            }
        //@ts-ignore    
        unsubscribe();
        }).catch(err => console.log(err));
        
    }
  
  };

  // Vane Pay WalletLess
  const handleVanePayWalletLess = async() =>{
    // await vanePayWalletLess(
    //   setFinalized,
    //   api,
    //   pair,
    //   accountPair,
    //   vanePayWalletParams.payee,
    //   vanePayWalletParams.amount,
    //   vanePayWalletParams.resolver        
    // );
    //handleNext()
    await fetch("/api/email/abdulrazzaqlukamba@gmail.com")
  };


  // handle Payer Confirmation for WalletLess
  const confirmPayerPayWalletLess =async()=>{
    await confirmPayerWalletLess(
        setActiveStep,
        setAllDone,
        api,
        pair,
        accountPair,
        ticketDetails?.reference
    )
  }
  
  // Fetch the reference number from storage
  if(finalized){
    
    payerTxnTicket(
        setTicketDetails,
        api,
        accountPair, // payer as current account injected
        vanePayWalletParams.payee
      )
    
    
    confirmationSubscriber();
  };

  // The above function updates ticketDetails and the below functions consumes it  
  // if(ticketDetails?.reference){

  //   // subscribe to confirmed accounts storage to check if Payee has already confirmed.
  //   // The payee needs to confirm first
    
  //   // update the confirmation on the UI

  // }


  

  return (
    <div  className="flex min-h-screen w-full flex-col items-center justify-center p-1 sm:p-2">
        <div className=" w-full sm:w-1/2 h-20 max-h-50 align-middle flex justify-center p-3 sm:p-4 flex-col bg-slate-50">
          <h2 className="maxWidth text-xs sm:text-base font-light flex justify-center">Send Funds via Email securely and onboard with ease</h2>
          <div className="flex align-middle justify-center">
            <Button sx={{fontSize:12}}><Link href="/payment/pending">Pending Payments</Link></Button>
            <Button sx={{fontSize:12}}><Link href="/profile/fund-account">Fund Account</Link></Button>
          </div>
        </div>

        <div className="mt-7 sm:mt-8">

        <Box className="w-auto ">
          <Stepper activeStep={activeStep} orientation="vertical">
            
              <Step key="1">
                <StepLabel
                  StepIconComponent={SendIcon}
                >
                  <span>Send To</span>
                </StepLabel>
                <StepContent>

                  <Card variant="outlined" className="w-full" sx={{display:"flex",flex:"column"}}>
                    <CardContent>
                      <Box component="form"
                           sx={{'& .MuiTextField-root': { m: 1}}}
                           className="w-full"
                           noValidate
                           autoComplete="off"
                      >
                        <div>
                          <TextField
                            required
                            size='small'
                            id="Email"
                            label="Email"
                            className="h-auto w-full"
                            //@ts-ignore
                            onChange={(e) => handleWalletParams({payee:e.target.value})}
                          />
                          <TextField
                            id="Amount"
                            size='small'
                            label="$"
                            className="h-auto w-full"
                            type='number'
                            //@ts-ignore
                            onChange={(e) => handleWalletParams({amount:e.target.value})}
                          />
                          
                        </div>
                      </Box>
                    </CardContent>
                  </Card>

                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="outlined"
                        size='small'
                        onClick={handleVanePayWalletLess}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Send
                      </Button>

                      <Button  size='small' sx={{ mt: 1, mr: 1 }}>
                        <Link href="/">
                        Cancel
                        </Link>
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              {/*First Step */}

              <Step key="2">
                <StepLabel
                  StepIconComponent={HandshakeIcon}
                >
                  <span>Verify & Confirm</span>
                </StepLabel>
                <StepContent>
                  <Card className="w-full" variant="outlined" sx={{display:"flex",flex:"column"}}>
                    <CardContent>
                      <Typography className="text-xm sm:base"  color="text.secondary" gutterBottom>
                          Verify the payee address and Confirm 
                      </Typography>
                      {payeeConfirmed ? 
                        (
                          <Box className="w-full" sx={{ display: 'flex', flexDirection:'column',padding:1, marginRight:1}}>
                              
                              <Alert sx={{padding:1,margin:2}} className="w-full" severity="success">
                                <AlertTitle className="text-xm sm:text-base">Payee Account</AlertTitle>
                      
                                  <Typography className="text-xm sm:text-base" color="text.secondary" gutterBottom>
                                    {ticketDetails?.payee}
                                  </Typography>
                    
                              </Alert>
                              <Alert sx={{padding:1,margin:2}} severity="info">
                                <AlertTitle className="text-xm sm:text-base">Amount</AlertTitle>
                      
                                  <Typography className="text-xm sm:text-base" color="text.secondary" gutterBottom>
                                    {ticketDetails?.amount}
                                  </Typography>
                    
                              </Alert>
                              {/* Add Amount */}
                          </Box>
                          
                        ) : 
                        (
                          <Box className="w-auto" sx={{ display: 'flex', flex:'column',padding:2, marginRight:10}}>
                            <Alert className="w-full" iconMapping={{
                                success: <CircularProgress />,
                              }}
                            >
                              Waiting Payee Confirmation
                            </Alert>
                          
                          </Box>
                        )
                      }
                      
                    </CardContent>
              
                  </Card>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="outlined"
                        disabled={payeeConfirmed === undefined}
                        onClick={confirmPayerPayWalletLess}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Confirm
                      </Button>
                      <Button
                       // disabled={index === 0}
                        onClick={handleBack}
                        color='error'
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Revert
                      </Button>
                      <Button
                       // disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Minimize Window
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              {/* Second Step */}

              {allDone === true && (
                 <Step key="1">
                 <StepLabel
                   StepIconComponent={DoneAllIcon}
                 >
                   <span>Status</span>
                 </StepLabel>
                 <StepContent className="w-auto">
                   <Alert className="w-full">All Done Great!</Alert>
                   <Box sx={{ mb: 2 }}>
                     <div>
                       <Button
                         variant="outlined"
                         sx={{ mt: 1, mr: 1 }}
                       >
                        <Link href="/payment">
                        Send another txn
                        </Link>
                       </Button>

                       <Button sx={{ mt: 1, mr: 1 }}>
                        <Link href="/">
                         Done
                         </Link>
                       </Button>
                     </div>
                   </Box>
                 </StepContent>
               </Step>
              )}

             
              {/* Last step */}

            </Stepper>
           </Box>

        </div>
    </div>
  )
}

export default Page;