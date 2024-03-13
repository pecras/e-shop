"use client"
import Container from '../components/Container'
import React from 'react'
import FormWrap from '../components/FormWrap'
import CheckOutClient from './CheckOutClient'


const Checkout = () => {



  return (
    <div className='p-8'>
        <Container>
            <FormWrap>
                <CheckOutClient />
            </FormWrap>

        </Container>
    </div>
  )
}

export default Checkout