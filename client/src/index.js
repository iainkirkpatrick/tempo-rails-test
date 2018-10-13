import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'redux-bundler-react'

import initStore from './bundles'

import Layout from './hocs/Layout'
// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={initStore()}>
    <Layout />
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker()
