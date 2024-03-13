"use client"
import { truncateText } from "@/utils/TruncateText";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import Image from "next/image"
import { useRouter } from "next/navigation";
interface ProductCardsProps{
data:any
}

const ProductCards:React.FC<ProductCardsProps> = ({data}) => {
 const router=useRouter()

    const productRating=data.reviews.reduce((acc:number,item:any)=>
    item.rating +acc,0

)/data.reviews.length

    return ( 
       <div
       onClick={()=>router.push(`/product/${data.id}`)}
       className=" col-span-1 cursor-pointer border-[1.2px]
        border-red-600 bg-white rounded-sm p-2 
       transition hover:scale-105 text-center text-sm ">
 <div className="flex flex-col items-center w-full gap-1">
 <div className="aspect-square overflow-hidden relative w-full  ">
    <Image fill src={data.images[0].image}
alt={data.name}
className="w-full h-full object-contain"/>
</div> 
<div className="mt-4">{truncateText(data.name)}
</div>
<div>{data.reviews.length} reviews</div>
<div className=" font-semibold">{formatPrice(data.price)}
</div>
<div>
    <Rating value={productRating} readOnly/>
</div>
</div> 
        </div> 
     );
}
 
export default ProductCards;