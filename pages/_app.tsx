import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}