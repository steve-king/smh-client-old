import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'

import { SocketProvider } from '@/lib/socket'
import { StoreProvider } from '@/lib/store'
import { ThemeProvider } from '@/lib/theme'

import { Header } from '@/components/header'

// const inter = Inter({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'] })

const title = 'SMH-Client'

export const metadata: Metadata = {
  title: process.env.NODE_ENV === 'development' ? `DEV: ${title}` : title,
  description: 'Node monitoring for Spacemesh',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={robotoMono.className}>
        <SocketProvider>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </ThemeProvider>
          </StoreProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
