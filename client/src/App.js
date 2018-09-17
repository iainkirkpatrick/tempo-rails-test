import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      signedIn: false,
      people: []
    }
  }
  
  componentDidMount () {
    window.fetch('/api/people')
    .then((res) => {
      return res.json()
    })
    .then((people) => {
      this.setState({
        people
      })
    })
  }
  
  handleSignIn () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    window.fetch('/api/auth/sign_in', {
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
    .then((creds) => {
      console.log('creds', creds)
    })
  }
  
  handleSignUp () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
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
    .then((creds) => {
      console.log('creds', creds)
    })
  }
  
  render() {
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
      </div>
    );
  }
}

export default App;
// 
// {
//   this.state.people.map((person, i) => {
//     return <h2 key={i}>{person.name}</h2>
//   })
// }