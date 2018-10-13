import React from 'react'
import { connect } from 'redux-bundler-react'
import isEmpty from 'lodash/isEmpty'

import Login from '../pages/Login'
import App from '../pages/App'

const Home = ({ user }) => {
  if (isEmpty(user)) {
    return <Login />
  } else {
    return <App />
  }
}

export default connect(
  'selectUser',
  Home
)
