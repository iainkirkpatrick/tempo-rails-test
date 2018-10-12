import React, { Component } from 'react'
import { connect } from 'redux-bundler-react'
import isEmpty from 'lodash/isEmpty'

const App = ({
  people,
  authForm,
  authErrors,
  doSignIn,
  doSignUp,
  doUpdateAuthFormEmail,
  doUpdateAuthFormPassword
}) => {
  return (
    <div>
      <header>
        <h1>Welcome to Tempo</h1>
      </header>
      <div>
        <label>email</label>
        <input id='email' value={authForm.email} onChange={(e) => doUpdateAuthFormEmail(e.target.value)}></input>
      </div>
      <div>
        <label>password</label>
        <input id='password' type={'password'} value={authForm.password} onChange={(e) => doUpdateAuthFormPassword(e.target.value)}></input>
      </div>
      <button onClick={() => doSignIn(authForm)}>sign in</button>
      <button onClick={() => doSignUp(authForm)}>sign up</button>
      {
        !isEmpty(authErrors)
        ? authErrors.map((err) => {
          return <p style={{ color: 'red' }}>{err}</p>
        })
        : null
      }
      {
        !isEmpty(people)
        ? <div>
            <h2>People</h2>
            {
              people.map((person, i) => {
                return <h4 key={i}>{person.name}</h4>
              })
            }
          </div>
        : null
      }
    </div>
  )
}

export default connect(
  'selectUser',
  'selectPeople',
  'selectAuthForm',
  'selectAuthErrors',
  'doSignIn',
  'doSignUp',
  'doFetchPeople',
  'doUpdateAuthFormEmail',
  'doUpdateAuthFormPassword',
  App
)
