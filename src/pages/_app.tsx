import '@/styles/globals.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
