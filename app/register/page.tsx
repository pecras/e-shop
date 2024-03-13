
import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import RegisterForm from './RegisterForm'
import { getCurrentUser } from '@/actions/getCurrent'
const Register = async () => {

  const currentUser= await getCurrentUser()
  return (
   <Container>
    <FormWrap>
      <RegisterForm currentUser={currentUser} />
    </FormWrap>
   </Container>
  )
}

export default Register