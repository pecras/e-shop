"use client"
import { formatPrice } from "@/utils/formatPrice"
import { Rating } from "@mui/material"
import { truncateText } from "@/utils/TruncateText"
import { useCallback, useEffect, useState } from "react"
import SetColor from "@/app/components/ProductsCards/setColor"
import SetQuantity from "@/app/components/ProductsCards/setQuantity"
import Button from "@/app/components/Button/Button"
import ProductImage from "@/app/components/ProductsCards/ProductImage"
import { useCart } from "@/hooks/useCart"
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


interface ProdcutsDetailsProps{
    product:any
}

export type SelectedImgType={
    color:string,
    colorCode:string,
    image: string
}

export type CartProductType={
    id:string,
    name:string,
    description:string,
    category:string,
    brand:string,
    selectedImg:SelectedImgType,
    quantity:number,
    price:number, 
   
}



const ProductDetails:React.FC<ProdcutsDetailsProps> = ({product}) => {
 
    const {handleAddProductToCart,cartProducts}=useCart()

    const productRating=product.reviews.reduce((acc:number,item:any)=>
    item.rating +acc,0)/product.reviews.length

    const[isProductionCart, setIsProductInCart]=useState(false)
    const[cartProduct,setCartProduct] = useState<CartProductType>({
        id:product.id,
        name:product.name,
        description:product.description,
        category:product.category,
        brand:product.brand,
        selectedImg:{...product.images[0]},
        quantity:1,
        price:product.price,
        
    })
    const router = useRouter()
    const ViewCart=()=>{
       router.push('/cart')
    }
useEffect(() => {
  setIsProductInCart(false)
if (cartProducts) {
    const exitingIndex = cartProducts.findIndex(
        (item)=>item.id === product.id
    );

    if(exitingIndex > -1)[
        setIsProductInCart(true)
    ]
    
}

}, [cartProducts])


   
    const handleColorSet=useCallback((value:SelectedImgType)=>{
        setCartProduct((prev)=>{return {...prev,selectedImg:value};
        })
        
    },
    [cartProduct.selectedImg])

    const handleQtyIncrease= useCallback(()=>{

        if (cartProduct.quantity===99) {
            return;
                  }

setCartProduct((prev)=>{
    return{...prev,quantity: 1+prev.quantity};
})

    },[cartProduct.quantity])
    const handleQtyDecrease=useCallback(()=>{
              if (cartProduct.quantity===1) {
        return;
              }
        setCartProduct((prev)=>{
                    return{...prev,quantity: prev.quantity-1};
    })
            },[cartProduct.quantity])

    return ( 
        <div key={product.id} className="grid grid-cols-1 md:grid-cols-2 gap-12">
           
            <div> <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSet} />
</div>

<div>
            <div  className="text-3x1  font-extrabold text-slate-700">{truncateText(product.name)}</div>
            <div> {formatPrice(product.price)}</div>
            <div>{product.reviews.length} reviews</div>
            <div> <Rating value={productRating} readOnly/></div>
            <div> {product.description}</div>
            <div>{product.brand}</div>
            <div>{product.category}</div>
            <div>{product.inStock?'Em Estoque':'Sem Estoque'}</div>
{isProductionCart ?( <>
    <div>
    <br/>       
             <br/>
             <div className="text-teal-500"><MdCheckCircle size={30}/>
             
             <span> Produto Adicionado com Sucesso </span> </div>
             
             <br/>    

                 <div className="max-w-[300px]">
                    <Button label="Ver o Carrinho" outline onClick={ViewCart}></Button>
                    </div>     
             </div>

</>):(<>
<div>
             <SetColor cartProduct={cartProduct} 
            images={product.images} 
            handleColorSelect={handleColorSet} />
            </div>
            <SetQuantity cartProduct={cartProduct}
           handleQtyIncrease={handleQtyIncrease}
           handleQtyDecrease={ handleQtyDecrease} />
            <div className="max-w-[300px] m-1">
                <Button label="Adicionar ao Carrinho"
                onClick={()=>{
                   handleAddProductToCart(cartProduct)
                    
                    }} />
            </div>
</>) }
            


            

            </div>
        </div>
     )
}
 
export default ProductDetails;