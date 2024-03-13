import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import NavBar from './components/Nav/NavBar'
import Footer from './components/Footer/Footer'
import CartProviders from '@/providers/cartProviders'
import { Toaster } from 'react-hot-toast'


const poppins= Poppins({ subsets: ['latin'],weight:["400","700"] })

export const metadata: Metadata = {
  title: 'e-shop',
  description: 'new E-shop',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

const YOUR_GOOGLE_API_KEY= process.env.API_KEY_GOOGLE
const SrcGoogle=`https://maps.googleapis.com/maps/api/js?key=${YOUR_GOOGLE_API_KEY}&libraries=places`
  return (
    <html lang="en">
  
 <body className={`${poppins.className} text-slate-700` }>
        <Toaster toastOptions={{
          style:{
            background:'rgb(51 65 85)',
            color:'#fff'
          }
        }}/>
        <CartProviders>
                  <div className='flex flex-col min-h-screen'>
<NavBar/>
                <main className='flex-grow'>{children}</main>
                <Footer/>
        
        </div>
        </CartProviders>

        </body>

    </html>
  )
}
