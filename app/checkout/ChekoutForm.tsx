"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Haeding";
import Button from "../components/Button/Button";

interface CheckoutFormProps{
    clientSecret: string;
    handleSetPaymentSuccess: (value:boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    clientSecret, 
    handleSetPaymentSuccess
    }) => {

    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [selectAddress,setSelectAdress]= useState(true)
    const [selectComplement,setSelectComplement]= useState(true)
    const [isLoading, setIsLoading] = useState(false);
    
    const formattedPrice = formatPrice(cartTotalAmount);


   
    useEffect(()=> {
        if(!stripe){
            return;
        }
        if(!clientSecret){
            return;
        }
        handleSetPaymentSuccess(false);
    },[stripe])

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsLoading(true);

        stripe.confirmPayment({
            elements, redirect: "if_required",
        }).then(result => {
            if(!result.error){
                toast.success("Compra Efetuada");

                handleClearCart();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            }
            setIsLoading(false);
        });
    };


    return <form onSubmit={handleSubmit} id="payment-form">
                <div className="mb-5">
                    <Heading title="Preencha com os dados para completar o Pagamento"/>
                </div>

                <h2 className="font-semibold mb-2">Informe o endereço</h2>
                <label>Utilizar o endereço já cadastrado para o envio?</label>
                <div>
                <select name="select">
  <option  onClick={()=>{setSelectAdress(true)}}value={'Sim'} >Sim</option>
  <option onClick={()=>{setSelectAdress(false)}} value={'Não'} >Não</option>

</select>

</div>
{selectAddress===true?<div>

</div>:<div>
<br/>


<AddressElement options={{
                    mode: "shipping",
                   allowedCountries: ['BR'],
                
                }}
                               />
              <br/>
              <label>Complemento?</label>
              <br/>

                <select name="complemento" id="complement" form="complement">
  
               
  <option onClick={()=>{setSelectComplement(true)}} value={'Sim'}/>
  <option  onClick={()=>{setSelectComplement(false)}} value={'Não'}/>
 
</select>
<br/>
<br/>{
selectComplement?<div>
    <input placeholder="Complemento" title="complements" className="rounded-md h-14 w-70">

    </input>
</div>:<div>
    
</div>

}
                
    </div>
    
    }

                

                <h2 className="font-semibold mt-4 mb-2"> Forma de pagamento</h2>
                <PaymentElement id="payment-element" options={{
                    layout: "tabs"
                }}/>
                <div className="py-4 text-center text-slate-700 text-xl font-bold">
                   Valor Total da Compra: {formattedPrice}
                </div>
                <Button label={isLoading ? "Carregando" : "Compra Efetuada"} disabled={isLoading || !stripe || !elements} onClick={()=>{}}/>
           </form>;
}
 
export default CheckoutForm;