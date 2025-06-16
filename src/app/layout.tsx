import '../shared/styles/globals.style.css'

import { type Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cookies } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'

import BroadcastAuthSync from '~/components/shared/broadcast-auth-sync'
// import BroadcastAuthSync from '~/components/shared/broadcast-auth-sync'
import HeroUIProvider from '~/components/shared/hero-ui-provider-client'
// import SocketHandler from '~/components/shared/socket/socket-handler'
import { AuthProvider, TanStackProvider, ThemeProvider } from '~/config/providers'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'BK-HOPE',
  description: 'BK-HOPE là nền tảng kết nối sinh viên với các dự án cộng đồng, tình nguyện và phát triển bền vững.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value ?? 'en'

  return (
    <html lang={language} suppressHydrationWarning>
      <head>
        <link rel='icon' href='/assets/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
      </head>
      <body className={`bg-noisy-background ${roboto.className}`} suppressHydrationWarning>
        <TanStackProvider>
          <AuthProvider>
            {/* {/* <SocketHandler /> */}
            <BroadcastAuthSync />
            <NextTopLoader showSpinner={false} />
            <HeroUIProvider>
              <ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
                {children}
              </ThemeProvider>
            </HeroUIProvider>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  )
}
