'use client'
import React, { useEffect, useState } from 'react'
import Heading from '../components/Haeding'
import Inputs from '../components/Inputs/Inputs'
import { useForm, SubmitHandler ,FieldValues} from "react-hook-form"
import Button from '../components/Button/Button'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface loginFormProps{
  currentUser:any
}


const LoginForm:React.FC<loginFormProps> = ({currentUser}) => {
const[isLoading, setIsloading]=useState(false)
const {register,handleSubmit,formState:{errors},}=useForm<FieldValues>(
  {defaultValues:{
  email:"",
  password:""
}})

useEffect(()=>{
  if (currentUser) {
    router.push("/cart");
    router.refresh();
    
  }
},[])

const router=useRouter()

const onSubmit:SubmitHandler<FieldValues> = (data)=>{
  setIsloading(true)
  signIn('credentials',{...data,redirect:false})
  .then((callback)=>{
    setIsloading(false)
    if(callback?.ok){
      toast.success('logado')
      router.push('/cart')
      router.refresh();
        
      
    }
if(callback?.error){
  toast.error(callback.error)
}
  })
 
}

if (currentUser) {
  return<p className='text-center'> Logado. Redirecionando...</p>
  
}

  return (
    <>
    <Heading title="Login "/> 
    <Button outline label='Continuar com o Google' icon={FcGoogle} onClick={()=>{signIn("google")}}/>
    <hr className='bg-slate-300 w-full h-px'/>
        <Inputs id="email" label="E-mail" type='email' disabled={isLoading} register={register}
    errors={errors} required/>
 
   
     <Inputs id="password" type="password" label="Senha" disabled={isLoading} register={register}
    errors={errors} required/>

    <Button label={isLoading? "Loading" : 'Login'} onClick={handleSubmit(onSubmit)}/>

  <p> Não tem uma conta ? <Link className='underline' href={'/register'}>Cadastre-se</Link>
  </p>
    </>
  )
}

export default LoginForm