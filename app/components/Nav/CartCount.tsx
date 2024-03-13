"use client"

import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {


const {cartTotalQty}= useCart();
const router = useRouter()

    return ( <div className="relative cursor-pointer"
    onClick={()=>router.push("/cart")}
    >
        <div className="text-3-1">
        <CiShoppingCart size={35}/>
        </div>
        <span className="absolute 
        top-[-5px]
        right-[-5px]
        bg-slate-800
        text-white
        h-5
        w-5
        rounded-full
        flex
        items-center
        justify-center
        text-sm
        ">

{cartTotalQty}        </span>
    </div> );
}
 
export default CartCount;