import React, { Component } from 'react'
import { connect } from 'redux-bundler-react'
import isEmpty from 'lodash/isEmpty'

class App extends Component {
  constructor () {
    super()
    this.state = {
      auth: null,
      account: false,
      errors: [],
      people: []
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!isEmpty(this.props.user) && isEmpty(prevProps.user)) {
      this.props.doFetchPeople()
    }
    // if (this.state.account !== false && prevState.account === false) {
    //   window.fetch('/api/people', { headers: this.state.auth })
    //   .then((res) => {
    //     if (res.ok) {
    //       this.setState((prevState, props) => {
    //         return {
    //           ...prevState,
    //           auth: {
    //             'access-token': res.headers.get('access-token'),
    //             client: res.headers.get('client'),
    //             expiry: res.headers.get('expiry'),
    //             'token-type': res.headers.get('token-type'),
    //             uid: res.headers.get('uid')
    //           }
    //         }
    //       })
    //     }
    //     return res.json()
    //   })
    //   .then((res) => {
    //     if (res.errors) {
    //       this.setState({
    //         errors: res.errors
    //       })
    //     } else {
    //       this.setState({
    //         people: res
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('err', err)
    //   })
    // }
  }

  handleSignIn () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    this.setState({
      errors: []
    })

    window.fetch('/api/auth/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => {
      if (res.ok) {
        this.setState((prevState, props) => {
          return {
            ...prevState,
            auth: {
              'access-token': res.headers.get('access-token'),
              client: res.headers.get('client'),
              expiry: res.headers.get('expiry'),
              'token-type': res.headers.get('token-type'),
              uid: res.headers.get('uid')
            }
          }
        })
      }
      return res.json()
    })
    .then((res) => {
      if (res.errors) {
        this.setState({
          errors: res.errors
        })
      } else {
        this.setState({
          account: res.data
        })
      }
    })
    .catch((err) => {
      console.log('err', err)
    })
  }

  handleSignUp () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    this.setState({
      errors: []
    })

    window.fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.success === false) {
        return this.setState({
          errors: res.errors
        })
      } else {
        return this.setState({
          account: res.data
        })
      }
    })
    .catch((err) => {
      console.log('err', err)
    })
  }

  render () {
    const { people, authForm, authErrors, doSignIn, doSignUp, doUpdateAuthFormEmail, doUpdateAuthFormPassword } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Tempo</h1>
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
    );
  }
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
