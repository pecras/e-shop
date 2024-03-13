'use client'
import React from 'react'
import { CartContextProvider } from '@/hooks/useCart'


interface CartProviderProps{
    children:React.ReactNode
}

const CartProviders:React.FC<CartProviderProps> = ({children}) => {
  return (
    <CartContextProvider>
      
        {children}
    </CartContextProvider>
  )
}

export default CartProviders