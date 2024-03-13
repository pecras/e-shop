
import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import LoginForm from './loginForm'
import { getCurrentUser } from '@/actions/getCurrent'

const Login = async () => {

  const currentUser=await getCurrentUser()

  return (
   <Container>
    <FormWrap>
      <LoginForm currentUser={currentUser} />
    </FormWrap>
   </Container>
  )
}

export default Login