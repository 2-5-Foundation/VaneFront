'use client'

import { Typography } from '@mui/material'
import React from 'react'
import { useWalletContext } from '@/Context/store'


function Page() {

  const {account}  = useWalletContext();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-2">
      <div className="w-5/6  h-25 max-h-50 p-5 items-center  text-white  bg-gray-800 flex flex-col justify-around">
        <Typography sx={{fontSize:20}}>
          {account?.meta.name}
        </Typography>
      </div>
    </main>
  )
}

export default Page;