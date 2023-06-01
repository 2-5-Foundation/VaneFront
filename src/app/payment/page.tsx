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

import HandshakeIcon from '@mui/icons-material/Handshake';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
// Alert Feedback
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// Form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// ---------TX & QUERIES--------------------------
import { vanePay } from '@/Component/VaneChainApi/PaymentApi/Tx';
// CONTEXT
import { useChainApiContext, useWalletContext,useTxnTicketContext } from '@/Context/store';
import { payerTxnTicket } from '@/Component/VaneChainApi/PaymentApi/Query';

//------------------------------------------------

function Page() {
  // CONTEXT
  const {account, signer}  = useWalletContext();
  const {api} = useChainApiContext();
  const {setTicketDetails,ticketDetails,finalized,setFinalized} = useTxnTicketContext();
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

  // Wallet or Wallet-Less
  const [isWallet, setIsWallet] = useState<boolean>();

  const [activeStep, setActiveStep] = useState(0);
  // TXN
  const [allDone, setAllDone] = useState<boolean>()
  const [confirm, setConfirm] = useState<Confirm>();
  const [resolver, setResolver] =  useState<Resolver>()
  const [payeeStatus, setPayeeStatus] = useState<TxnTicket>();
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


  // Call TXN VANE PAY
  const handleVanePay = async() =>{
      await vanePay(
        setFinalized,
        api,
        signer,
        account?.address,
        vanePayWalletParams.payee,
        vanePayWalletParams.amount,
        vanePayWalletParams.resolver        
      );
      
  };

  if(finalized){
    payerTxnTicket(api,account?.address)
  }

  return (
    <div  className="flex min-h-screen w-full flex-col items-center justify-center  p-2">
        <div className="w-1/2 h-20 max-h-50 align-middle flex  justify-around p-4 flex-row bg-slate-50">
          <h2>Feel safe and experience risk free crypto payment</h2>
        </div>

        <div className="mt-8">

        <Box sx={{ width:700 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            
              <Step key="1">
                <StepLabel
                  StepIconComponent={SendIcon}
                >
                  <span>Send To</span>
                </StepLabel>
                <StepContent>

                  <Card variant="outlined" sx={{display:"flex",flex:"column", width:600 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                          Send To
                      </Typography>
                      <Box component="form"
                           sx={{'& .MuiTextField-root': { m: 1, width: '50ch' },}}
                           noValidate
                           autoComplete="off"
                      >
                        <div>
                          <TextField
                            required
                            id="Payee-Address"
                            label="Payee-Address"
                            //@ts-ignore
                            onChange={(e) => handleWalletParams({payee:e.target.value})}
                          />
                          <TextField
                            id="Amount"
                            label="Amount"
                            //@ts-ignore
                            onChange={(e) => handleWalletParams({amount:e.target.value})}
                          />
                          {/* <FormControl sx={{ m: 1, minWidth: 120, width:50 }} size="small">
                            <InputLabel id="resolver">Resolver Choice</InputLabel>
                              <Select
                                labelId="resolver-choice"
                                id="resolver"
                                defaultValue="null"
                                value={resolver}
                                label="resolver"
                                onChange={handleResolver}
                              >
                                <MenuItem value={Resolver.null}>No Resolver</MenuItem>
                              </Select>
                          </FormControl> */}
                        </div>
                      </Box>
                    </CardContent>
                  </Card>

                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="outlined"
                        onClick={handleVanePay}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Send
                      </Button>

                      <Button sx={{ mt: 1, mr: 1 }}>
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
                  <Card variant="outlined">
                    <CardContent>
                      <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                          Verify the payee address and Confirm 
                      </Typography>
                      {payeeStatus ? 
                        (
                          <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                            
                          </Typography>
                        ) : 
                        (
                          <Box sx={{ display: 'flex', flex:'column',padding:2, marginRight:10}}>
                            <Alert iconMapping={{
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
                        disabled={payeeStatus === undefined}
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Confirm
                      </Button>
                      <Button
                       // disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Revert
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
                 <StepContent>
                   <Alert>All Done Great!</Alert>
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