'use client'

import { Typography } from '@mui/material'
import React from 'react'
import { useWalletContext, useWalletLessContext } from '@/Context/store'


function Page() {

  const {account,isWallet,accountPair}  = useWalletContext();
  const {data} = useWalletLessContext()

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-1 sm:p-2">
        <h1>GM</h1>
        <Typography sx={{fontSize:20}}>
          {
            //@ts-ignore
            isWallet? account?.meta.name : data?.name
          }
        </Typography>
        <h1>Address:
          {
            isWallet? account?.address : accountPair
          }
        </h1>
      
    </main>
  )
}

export default Page;