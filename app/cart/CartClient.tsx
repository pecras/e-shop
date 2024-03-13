"use client"
import { useCart } from '@/hooks/useCart'
import React from 'react'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import Heading from '../components/Haeding'
import Button from '../components/Button/Button'
import ItemContent from './ItemContent'
import { formatPrice } from '@/utils/formatPrice'
import { useRouter } from 'next/navigation'



interface CartClientProps {
    currentUser:any
}

export const CartClient:React.FC<CartClientProps> = ({currentUser}) => {
const {cartProducts,handleClearCart,cartTotalAmount}=useCart();
const router=useRouter()

console.log(currentUser)
if (!cartProducts || cartProducts.length ===0)
{return(<div className='flex flex-col items-center'>
    <div className='"text-2x1'> Seu Carrinho está vazio  

    </div>
    <div> 
        <Link href ={"/"} className=" text-slate-400 flex items-center gap-1 mt-2">
            <MdArrowBack/>
            <span>Comece as Compras</span>
        </Link>
    </div>
    
</div>)}
  return (
    <div>
        <Heading title='Carrinho de Compras' center/>
        <div>
        <div className='" grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
            <div className='col-span-2 justify-self-start'>Produto</div>
            <div className='justify-self-center'>Preço</div>
            <div className='justify-self-center'>Quantidade</div>
            <div className='justify-self-center'>Total</div>
            
        </div>
{cartProducts &&
cartProducts.map((item)=>{
    return(<ItemContent key={item.id} item={item}/>)
})
}

      
        
        
         </div>
    <div className='border-t-[1.5px] border-slate-200 py-4 justify-between gap-4'> 
    <div className='w-[90px]'>
        
        <Button label="Limpar Carrinho" onClick={()=>handleClearCart()} small outline/>
        </div>
        <div className='text-sm flex flex-col gap-1 items-start'>
            <div className=' flex justify-between w-full text-base font-semibold'>
                <span>
              Subtotal
                </span>
                <span>
                {formatPrice(cartTotalAmount)}
                </span>
<p> Taxas e envio calculado ao final </p>

    <div>
        <Button label={currentUser ? 'Comprar':"Faça o Login para comprar "} 
 outline={currentUser ? false:true}
 onClick={()=>{
  

    currentUser? router.push('/checkout') : router.push('/login')
   
}}/>
         </div>



<div> 
        <Link href ={"/"} className=" text-slate-400 flex items-center gap-1 mt-2">
            <MdArrowBack/>
            <span>Continuar as Compras</span>
        </Link>
    </div>

            </div>
        </div>
        </div>
    </div>
  )
}
