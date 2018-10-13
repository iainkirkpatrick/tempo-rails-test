import React, { Component } from 'react'
import { connect } from 'redux-bundler-react'
import isEmpty from 'lodash/isEmpty'
import { Flex, Heading, Text, Button } from 'rebass'

const Login = ({
  authForm,
  authErrors,
  doSignIn,
  doSignUp,
  doUpdateAuthFormEmail,
  doUpdateAuthFormPassword
}) => {
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Heading>Welcome to Tempo</Heading>
      <Flex>
        <label>email</label>
        <input id='email' value={authForm.email} onChange={(e) => doUpdateAuthFormEmail(e.target.value)}></input>
      </Flex>
      <Flex>
        <label>password</label>
        <input id='password' type={'password'} value={authForm.password} onChange={(e) => doUpdateAuthFormPassword(e.target.value)}></input>
      </Flex>
      <Button onClick={() => doSignIn(authForm)}>sign in</Button>
      <Button onClick={() => doSignUp(authForm)}>sign up</Button>
      {
        !isEmpty(authErrors)
        ? authErrors.map((err) => {
          return <Text style={{ color: 'red' }}>{err}</Text>
        })
        : null
      }
    </Flex>
  )
}

export default connect(
  'selectUser',
  'selectAuthForm',
  'selectAuthErrors',
  'doSignIn',
  'doSignUp',
  'doUpdateAuthFormEmail',
  'doUpdateAuthFormPassword',
  Login
)
