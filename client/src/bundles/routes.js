import { createRouteBundle } from 'redux-bundler'

import Home from '../hocs/Home'

export default createRouteBundle({
  '/': Home
})
