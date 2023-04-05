import '@/styles/globals.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>
}
