import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppProvider from '../context'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
