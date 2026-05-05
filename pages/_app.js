import '@/styles/globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <div className={inter.variable}>
        <Component {...pageProps} />
      </div>
    </LanguageProvider>
  )
}
