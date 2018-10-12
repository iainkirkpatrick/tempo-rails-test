const name = 'auth'

const initialState = {
  isSigningUp: false,
  isSigningIn: false,
  authForm: {
    email: '',
    password: ''
  },
  errors: [],
  headers: {},
  user: {}
}
const reducer = (state = initialState, action) => {
  if (action.type === 'AUTH_SIGNUP_START') {
    return { ...state, isSigningUp: true }
  }
  if (action.type === 'AUTH_SIGNUP_SUCCESS') {
    return { ...state, isSigningUp: false, user: action.payload, authForm: { email: '', password: '' } }
  }
  if (action.type === 'AUTH_SIGNUP_ERROR') {
    return { ...state, isSigningUp: false, errors: action.payload }
  }

  if (action.type === 'AUTH_SIGNIN_START') {
    return { ...state, isSigningIn: true }
  }
  if (action.type === 'AUTH_SIGNIN_SUCCESS') {
    return { ...state, isSigningIn: false, user: action.payload, authForm: { email: '', password: '' } }
  }
  if (action.type === 'AUTH_SIGNIN_ERROR') {
    return { ...state, isSigningIn: false, errors: action.payload }
  }

  if (action.type === 'AUTH_FORM_EMAIL_UPDATE') {
    return { ...state, authForm: { ...state.authForm, email: action.payload } }
  }
  if (action.type === 'AUTH_FORM_PASSWORD_UPDATE') {
    return { ...state, authForm: { ...state.authForm, password: action.payload } }
  }

  if (action.type === 'AUTH_SET_CREDENTIALS') {
    return { ...state, headers: action.payload }
  }
  return state
}

const selectors = {
  selectUser: (state) => state.auth.user,
  selectAuthForm: (state) => state.auth.authForm,
  selectAuthErrors: (state) => state.auth.errors,
  selectIsSigningIn: (state) => state.auth.isSigningIn,
  selectIsSigningUp: (state) => state.auth.isSigningUp
}

const actionCreators = {
  doUpdateAuthFormEmail: (email) => ({ dispatch }) => {
    dispatch({ type: 'AUTH_FORM_EMAIL_UPDATE', payload: email })
  },
  doUpdateAuthFormPassword: (password) => ({ dispatch }) => {
    dispatch({ type: 'AUTH_FORM_PASSWORD_UPDATE', payload: password })
  },
  doSignUp: (authForm) => ({ dispatch, apiFetch }) => {
    dispatch({ type: 'AUTH_SIGNUP_START', payload: authForm })
    apiFetch('auth', {
      method: 'POST',
      body: JSON.stringify(authForm)
    })
    .then((res) => {
      // TODO: if !res.ok, log the status code somewhere
      if (res.ok) {
        const authHeaders = {
          'access-token': res.headers.get('access-token'),
          client: res.headers.get('client'),
          expiry: res.headers.get('expiry'),
          'token-type': res.headers.get('token-type'),
          uid: res.headers.get('uid')
        }
        dispatch({ type: 'AUTH_SET_CREDENTIALS', payload: authHeaders })
      }
      return res.json()
    })
    .then(({ data, errors }) => {
      if (errors) {
        dispatch({ type: 'AUTH_SIGNUP_ERROR', payload: errors })
      } else {
        dispatch({ type: 'AUTH_SIGNUP_SUCCESS', payload: data })
      }
    })
  },
  doSignIn: (authForm) => ({ dispatch, apiFetch }) => {
    dispatch({ type: 'AUTH_SIGNIN_START', payload: authForm })
    apiFetch('auth/sign_in', {
      method: 'POST',
      body: JSON.stringify(authForm)
    })
    .then((res) => {
      // TODO: if !res.ok, log the status code somewhere
      if (res.ok) {
        const authHeaders = {
          'access-token': res.headers.get('access-token'),
          client: res.headers.get('client'),
          expiry: res.headers.get('expiry'),
          'token-type': res.headers.get('token-type'),
          uid: res.headers.get('uid')
        }
        dispatch({ type: 'AUTH_SET_CREDENTIALS', payload: authHeaders })
      }
      return res.json()
    })
    .then(({ data, errors }) => {
      if (errors) {
        dispatch({ type: 'AUTH_SIGNIN_ERROR', payload: errors })
      } else {
        dispatch({ type: 'AUTH_SIGNIN_SUCCESS', payload: data })
      }
    })
  }
}

export default {
  name,
  reducer,
  ...selectors,
  ...actionCreators
}
