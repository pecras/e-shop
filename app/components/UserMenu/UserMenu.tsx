"use client"


import React, { useCallback, useState } from 'react'
import Avatar from '../Avatar';
import Link from 'next/link';
import MenuItem from './MenuItem';
import BackDrop from './BackDrop';
import { signOut } from 'next-auth/react';



interface UserMenuProps{
    currentUser:any
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {

const [isopen,setOpen]=useState(false);
const toggleOpen = useCallback(()=>{setOpen((prev)=>!prev)},[])    




    return (<div>
    <div className='relative z-30'>
        <div className='p-2 border-slate-700
        flex
        flex-row
        items-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-400
        ' onClick={toggleOpen}>

<Avatar src={currentUser?.image}/>
        </div>
        {isopen && <div
        className='absolute 
        right-3 
        rounded-md
         shadow-md 
        w-[260px]
        bg-white
        overflow-hidden
        cursor-pointer
        '>
            {currentUser ? <div>
            <Link href={'/orders'}>
                <MenuItem onClick={toggleOpen}>
                    Seus Pedidos
                </MenuItem>
            </Link>
            <Link href={'/admin'}>
                <MenuItem onClick={toggleOpen}>
                   Painel do Administrador
                </MenuItem>
            </Link>
            <hr/>
          
                <MenuItem onClick={()=>{
                    toggleOpen();
                    signOut()
                }}>
                   Sair/Logout
                </MenuItem>
                </div> : 
                <div>
              
                 

                 <Link href={'/login'}>
                 <MenuItem onClick={toggleOpen}>
                  Entrar/Login
                 </MenuItem>
             </Link>
             <Link href={'/register'}>
                 <MenuItem onClick={toggleOpen}>
                    Criar Perfil
                 </MenuItem>
             </Link>
                
                 </div>
           }
            </div>
        }
    </div>
    {isopen ? <BackDrop onClick={toggleOpen}/>: null}
    </div>
  )
}

export default UserMenu