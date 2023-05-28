import './globals.css'
import { Inter } from 'next/font/google'
import { WalletContextProvider,ChainApiContextProvider } from '../Context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vane Trust',
  description: 'Composable digital experience for solo online retailers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WalletContextProvider>
        <ChainApiContextProvider>
          {children}
        </ChainApiContextProvider>
      </WalletContextProvider>        
      </body>
    </html>
  )
}
