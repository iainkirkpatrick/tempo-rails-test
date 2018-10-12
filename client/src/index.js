import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'redux-bundler-react'

import initStore from './bundles'

import App from './App'
// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={initStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker()
