import './globals.css'
import { Inter } from 'next/font/google'
import { WalletContextProvider,ChainApiContextProvider,TxnTicketContextProvider, WalletLessProvider } from '../Context/store'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vane Trust',
  description: 'Composable blockchain experience for solo online retailers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletLessProvider>
          <WalletContextProvider>
            <ChainApiContextProvider>
              <TxnTicketContextProvider>
                {children}
              </TxnTicketContextProvider>
            </ChainApiContextProvider>
          </WalletContextProvider> 
        </WalletLessProvider>       
      </body>
    </html>
  )
}
