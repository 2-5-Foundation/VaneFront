'use client'

import React from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';


function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-1 sm:p-2">
      <Card variant="outlined" className="w-full sm:p-10 sm:w-1/4 flex flex-col align-middle justify-around" sx={{display:"flex",flex:"column"}}>
        <TextField/>
        <TextField/>
      </Card>
    </main>
  )
}

export default Page