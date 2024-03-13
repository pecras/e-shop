
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext,
     useCallback,
      useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from 'react'



interface Props {
    [propName:string]:any
}


type CartContextType = {
    cartTotalQty:number
    cartTotalAmount:number
    cartProducts:CartProductType[]|null;
    handleAddProductToCart:(product:CartProductType) => void
    handleRemoveProductfromCart:(product:CartProductType) => void
    handleCartQtyIncreases:(product:CartProductType) =>void
    handleCartQtyDecrease:(product:CartProductType) =>void
    handleClearCart:()=>void
    paymentIntent:string|null;
    handleSetPaymentIntent:(val:string|null)=> void
}

export const CartContext = createContext<CartContextType| null>(null);


export const CartContextProvider= (props:Props)=>{
    const [cartTotalQty,setCartTotalQty]=useState(0)
    const [cartTotalAmount,setCartTotalAmount]=useState(0)
    const[cartProducts, setCartProducts]=useState<CartProductType[]|null>(null) 
    const [paymentIntent, setPaymentIntent]=useState<string|null>(null)

useEffect(()=>{
    const cartItems:any = localStorage.getItem('eShopCartItems')
    const cproducts: CartProductType[]|null = JSON.parse(cartItems)
    const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')
const PaymenIntent:string |null = JSON.parse(eShopPaymentIntent)
    setCartProducts(cproducts)
    setPaymentIntent(PaymenIntent)
},[])


useEffect(()=>{
 const getTotals = ()=>{
  if(cartProducts){
   const {total,qty}= cartProducts?.reduce((acc,item) =>{
      const itemTotal=item.price *item.quantity
  
      acc.total +=itemTotal
      acc.qty +=item.quantity
 
      return acc
    }, {
      total:0,
      qty:0
    })

    setCartTotalQty(qty)
    setCartTotalAmount(total)
  }
 
 }

 getTotals()
},[cartProducts])


const  handleAddProductToCart = useCallback((product:CartProductType)=>{
    setCartProducts((prev)=>{
        let updatedCart;

        if (prev) {
            updatedCart= [...prev,product];
   }else{
    updatedCart=[product]
   }
   toast.success('Produto adicionado ao carrinho')
   localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
   return updatedCart
    })
},[])

const handleRemoveProductfromCart =useCallback((product:CartProductType)=>{
   if(cartProducts){
    const filteredproducts = cartProducts.filter((item)=>{return item.id !== product.id})
    setCartProducts(filteredproducts)
    toast.success('Produto Removido')
   localStorage.setItem('eShopCartItems',JSON.stringify(filteredproducts))


return filteredproducts
   } 
},[cartProducts])






const handleCartQtyIncreases = useCallback((product:CartProductType) => {
    if (product.quantity === 99) {
      toast.error("Ooops! Máximo possível");
      return;
    }

    if(cartProducts){
    const updatedCart = cartProducts.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );


    setCartProducts(updatedCart);

   
    localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    }
  }, [cartProducts, setCartProducts]);

  



const handleCartQtyDecrease = useCallback((product:CartProductType)=>{
    let updatedCart:any=[]
    if (product.quantity === 1){
        return toast.error("Ooops! Mínimo possível");
    }
    if (cartProducts) {
        updatedCart = cartProducts.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
    
        setCartProducts(updatedCart);
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      }
    }, [cartProducts, setCartProducts])


    const handleClearCart = useCallback(()=>{
       
        
            setCartProducts(null);
            setCartTotalQty(0)
            localStorage.setItem('eShopCartItems', JSON.stringify('[]'));
            localStorage.removeItem('eShopCartItems')
            toast.success('Todos os Itens do carrinho foram excluídos')
        }, [cartProducts, setCartProducts])


        const handleSetPaymentIntent = useCallback((val:string|null)=>{
          console.log(val)
setPaymentIntent(val)
localStorage.setItem("eShopPaymentIntent",JSON.stringify(val))
return val
        },[paymentIntent])


    const value ={
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductfromCart,
        handleCartQtyIncreases,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent
      }

    return <CartContext.Provider value={value} {...props} />


};
export const useCart =()=>{
    const context =useContext(CartContext);

    if(context ===null){
        throw new Error("useCart must be user within a CartContextProvider")
    }
return context
}


