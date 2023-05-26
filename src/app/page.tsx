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

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-2">
      {/*Welcoming Witty text */}
      <div className="w-4/6  h-25 max-h-50 p-5 items-center  text-white  bg-gray-800 flex flex-col justify-around">
         <h1 className="font-semibold text-lg w-4/6"><PermIdentityIcon/><Link href="/profile">GM User</Link>  <span className="font-semibold mx-9 italic">What do you want to Experience today?</span></h1>
         {/* tl;dr Activity, Analytics, Plan */}
         <div className="flex justify-around align-middle bg-transparent h-24 p-5 w-full">
            <div>Configuration<h1 className="font-semibold underline underline-offset-8">Wallet</h1></div>
            <div >Ads Analytics<h1 className="font-semibold underline underline-offset-8">100 impressions</h1></div>
            <div>Subscription Plan<h1 className="font-semibold underline underline-offset-8">Bronze</h1></div>
            <div>Clients Community Members(DAO)<h1 className="font-semibold underline underline-offset-8">5</h1></div>
         </div>
      </div>

      {/* Products*/ }
      <div className="w-3/5 h-130 max-h-150 p-5 flex flex-wrap justify-evenly flex-row bg-white">
        <div className="m-5">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Secure & Risk-Free Payment
              </Typography>
              <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/payment">Send</Link></Button>
            </CardActions>
          </Card>
        </div>

        <div className="m-5">
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Run On-Chain Ads
              </Typography>
              <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/aoc">Learn More</Link></Button>
            </CardActions>
          </Card>
        </div>
 
        <div className="m-5">
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Build Your Client Community.
              </Typography>
              <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/dao">Learn More</Link></Button>
            </CardActions>
          </Card>
        </div>

        <div className="m-5">
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Store & Grow your Capital
              </Typography>
              <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/dex">Learn More</Link></Button>
            </CardActions>
          </Card>
        </div>

        <div className="m-5">
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Use WhatsApp Interface
              </Typography>
              <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href="/web2">Learn More</Link></Button>
            </CardActions>
          </Card>
        </div>
      </div>
      
      {/* Setting up profile & Wallet*/}
      <div className="w-1/2 h-20 max-h-50 align-middle flex  justify-around p-4 flex-row bg-slate-50">
        <div>
          <AccountBalanceWalletIcon/>
        <Button size="small"><Link href="/wallet">Configure Wallet</Link></Button>
        </div>

        <div>
          <SettingsApplicationsIcon/>
        <Button size="small"><Link href="/setting">Settings</Link></Button>
        </div>

        <div>
          <CurrencyBitcoinIcon/>
        <Button size="small"><Link href="/plan">Choose Plan</Link></Button>
        </div>
      </div>
    </main>
  )
}
