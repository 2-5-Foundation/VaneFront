'use client';

import Image from 'next/image'
import Link from 'next/link'
// Material UI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppBar from '@mui/material/AppBar';
import VisibilityIcon from '@mui/icons-material/Visibility';
//---------------------------------------------------------------------------
import { useChainApiContext, useWalletContext, useWalletLessContext } from '../Context/store';
import { useEffect } from 'react';




export default function Home() {
  const {account,isWallet}  = useWalletContext();
  const {api,fetchChainApi} = useChainApiContext()
  const {data} = useWalletLessContext();

  useEffect(()=>{
    fetchChainApi()  
  },[])

  return (
    <main className="flex p-2 min-h-screen w-auto flex-col items-center justify-between">
      {/*Welcoming Witty text */}
        <div className="flex flex-col sm:w-4/6 align-middle justify-center items-center">
            <Card elevation={1}  className="bg-slate-50 w-full m-2 sm:w-4/6 " sx={{boxSizing:"border-box", display:'flex',flexDirection:"column",alignItems:"center"}}>
            
            <h1 className="font-semibold p-2 flex flex-col sm:flex-row align-middle justify-center sm:mx-4 h-auto text-sm w-5/6"><PermIdentityIcon/>GM
              <span className="px-2 sm:px-5">
            {
            account? isWallet? account.meta?.name : data?.name :'Anon'
            }
            </span>
            </h1>
            </Card>
            {/* Setting up profile & Wallet*/}
            <Card variant='outlined' className=" w-full sm:w-4/6 h-auto align-middle flex justify-around p-1 flex-row m-5">
            <Card elevation={0}>
              
                <Button className="text-xs" ><Link href="/profile">Profile</Link></Button>
                </Card>

                <Card elevation={0} className=" hidden sm:flex text-xs h-auto w-20">
                  
                  <Button className="text-xs" ><Link href="/wallet">Wallet</Link></Button>
                </Card>

                <Card elevation={0}>

                  <Button className="text-xs" ><Link href="/sign-in">Sign-In</Link></Button>
                </Card>

                <Card elevation={0}>
                  
                <Button className="text-xs" ><Link href="/plan">Plan</Link></Button>
              </Card>


          </Card>
            {/* tl;dr Activity, Analytics, Plan */}
          <Card elevation={0} className="text-xs w-full sm:py-5 sm:text-base mt-5 mb-1 sm:w-4/6" sx={{display:"flex",backgroundColor:"inherit",flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap"}}>
              <Card className="hidden sm:flex sm:flex-col" elevation={1} sx={{display:"flex",backgroundColor:"inherit", alignItems:"center", minWidth:150, minHeight:100,padding:5}}>Config<h1 className="font-medium text-sm ">Wallet</h1></Card>
              <Card elevation={1} sx={{display:"flex",backgroundColor:"inherit", alignItems:"center",flexDirection:"column", minWidth:150,padding:5}}>Ads-Analytics<h1 className="font-medium text-sm ">100 <VisibilityIcon/></h1></Card>
              <Card elevation={1} sx={{display:"flex",backgroundColor:"inherit", alignItems:"center",flexDirection:"column", minWidth:150,padding:5}}>Plan<h1 className="font-medium text-sm ">Bronze</h1></Card>
              <Card elevation={1} sx={{display:"flex",backgroundColor:"inherit", alignItems:"center",flexDirection:"column", minWidth:150,padding:5}}>Clients<h1 className="font-medium text-sm ">5</h1></Card>
          </Card>
        
        </div>
        

       
      
       

      {/* Products*/ }
      <div className="w-full sm:w-3/6 h-130 max-h-150 p-5 flex flex-wrap justify-evenly flex-row ">
        <div className="m-5">
          <Card variant="outlined" sx={{ minWidth: 300 ,minHeight:200}}>
            <CardContent>
              <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                  Secure & Risk-Free Payment
              </Typography>
              <Typography sx={{ fontSize: 15 }} variant="body2">
                  <br />
                  Be free from incorrect crypto address mistakes <br></br>
                  Feel safe while sending funds <br/> 
                  Control your transfered funds along the way
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/payment">Send</Link></Button>
            </CardActions>
          </Card>
        </div>

        <div className="m-5">
        <Card variant="outlined" sx={{ minWidth: 300,minHeight:200 }}>
            <CardContent>
              <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                  Connect to your e-commerce platform <br/>and achieve TrustLess Payment
              </Typography>
              <Typography sx={{ fontSize: 15 }} variant="body2">
                  No need for customer to trust you <br/> to be accountable <br/>
                  Leverage trust from using Vane <br/> Access world wide customers
                  <br/>from one interface
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/dex">Learn More</Link></Button>
            </CardActions>
          </Card>
        </div>

        <div className="m-5">
        <Card variant="outlined" sx={{ minWidth: 300,minHeight:200 }}>
            <CardContent>
              <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                  Run On-Chain Ads
              </Typography>
              <Typography sx={{ fontSize: 15 }} variant="body2">
                  Gain visibility from Dexs, Chain explorers <br/> and
                  protocals using unique <br/> Vane Metadata transfer protocol
                  
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/aoc">Learn More</Link></Button>
            </CardActions>
          </Card>
        </div>
 
        <div className="m-5">
        <Card variant="outlined" sx={{ minWidth: 300,minHeight:210 }}>
            <CardContent>
              <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                Build Your Client Community.
              </Typography>
              <Typography sx={{ fontSize: 15 }} variant="body2">
                  Benefit verifiable testimonials and <br></br>
                  actual client retention and inputs
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/dao">Learn More</Link></Button>
            </CardActions>
          </Card>
        </div>


      </div>
      {/* Footer */}
      <Card variant='outlined' className="bg-slate-50 w-full m-3 sm:w-4/6 ">
        
      </Card>
    </main>
  )
}
