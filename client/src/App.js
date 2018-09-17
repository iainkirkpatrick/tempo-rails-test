import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
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
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.people.map((person, i) => {
            return <h2 key={i}>{person.name}</h2>
          })
        }
      </div>
    );
  }
}

export default App;
