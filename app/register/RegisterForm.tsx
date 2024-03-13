'use client'
import React, { useState,useEffect } from 'react'
import Heading from '../components/Haeding'
import Inputs from '../components/Inputs/Inputs'
import { useForm, SubmitHandler ,FieldValues} from "react-hook-form"
import Button from '../components/Button/Button'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

interface RegisterFormProps{
  currentUser:any
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
const[isLoading, setIsloading]=useState(false)
const {register,handleSubmit,formState:{errors},}=useForm<FieldValues>(
  {defaultValues:{
  name:"",
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
  axios.post('/api/register', data).then(()=>{
    toast.success('Conta criada com sucesso')

    signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false,
    }).then((callback)=>{
      if(callback?.ok){
        toast.success('logado')
        router.push('/cart')
        router.refresh();
          
        
      }
if(callback?.error){
    toast.error(callback.error)
}

    })
  }).catch(() => toast.error("Alguma coisa está errada")).finally(()=>{
    setIsloading(false)
  })
}

if (currentUser) {
  return<p className='text-center'> Logado. Redirecionando...</p>
  
}

  return (
    <>
    <Heading title="Cadastre-se ;) "/> 
    <Button outline label='Conectar com o Google' icon={FcGoogle} onClick={()=>{signIn("google")}}/>
    <hr className='bg-slate-300 w-full h-px'/>
    <GooglePlacesAutocomplete apiKey={process.env.API_KEY_GOOGLE}/>
    <Inputs id="name" label="Nome" disabled={isLoading} register={register}
    errors={errors} required/>
     <Inputs id="email" label="E-mail" type='email' disabled={isLoading} register={register}
    errors={errors} required/>
     <Inputs id="password" type="password" label="Senha" disabled={isLoading} register={register}
    errors={errors} required/>

    <Button label={isLoading? "Loading" : 'Cadastrar'} onClick={handleSubmit(onSubmit)}/>

  <p> Já possui uma conta? <Link className='underline' href={'/login'}>Log in</Link>
  </p>
    </>
  )
}

export default RegisterForm