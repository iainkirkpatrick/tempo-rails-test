import {
  composeBundles,
  debugBundle,
  createUrlBundle,
  asyncCountBundle
} from 'redux-bundler'

import extraArgs from './extra-args'
import routes from './routes'
import auth from './auth'
import people from './people'

export default composeBundles(
  routes,
  asyncCountBundle,
  createUrlBundle(),
  extraArgs,
  auth,
  people,
  debugBundle
)
