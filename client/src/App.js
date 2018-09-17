import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
    if (this.state.account !== false && prevState.account === false) {
      window.fetch('/api/people', { headers: this.state.auth })
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
            people: res
          })
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
    }
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
    console.log('state', this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <label>email</label>
          <input id='email'></input>
        </div>
        <div>
          <label>password</label>
          <input id='password' type={'password'}></input>
        </div>
        <button onClick={() => this.handleSignIn()}>sign in</button>
        <button onClick={() => this.handleSignUp()}>sign up</button>
        {
          this.state.errors
          ? this.state.errors.map((err) => {
            return <p style={{ color: 'red' }}>{err}</p>
          })
          : null
        }
        {
          this.state.account
          ? <div>
              <h2>People</h2>
              {
                this.state.people.map((person, i) => {
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

export default App;
