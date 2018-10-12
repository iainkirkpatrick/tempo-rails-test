import { createSelector } from 'redux-bundler'
import isEmpty from 'lodash/isEmpty'

const name = 'people'

const initialState = {
  isFetchingPeople: false,
  people: []
}
const reducer = (state = initialState, action) => {
  if (action.type === 'FETCH_PEOPLE_START') {
    return { ...state, isFetchingPeople: true }
  }
  if (action.type === 'FETCH_PEOPLE_SUCCESS') {
    return { ...state, isFetchingPeople: false, people: action.payload }
  }
  return state
}

const selectors = {
  selectPeople: (state) => state.people.people,
  selectIsFetchingPeople: (state) => state.people.isFetchingPeople
}

const actionCreators = {
  doFetchPeople: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: 'FETCH_PEOPLE_START' })
    apiFetch('/people')
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(new Error(`${res.status} ${res.statusText}`))
      }
      return res.json()
    })
    .then((people) => {
      dispatch({ type: 'FETCH_PEOPLE_SUCCESS', payload: people })
    })
  }
}

const reactors = {
  reactFetchPeople: createSelector(
    'selectIsFetchingPeople',
    'selectPeople',
    'selectUser',
    (isFetchingPeople, people, user) => {
      if (!isFetchingPeople && isEmpty(people) && !isEmpty(user)) {
        return { actionCreator: 'doFetchPeople' }
      }
    }
  )
}

export default {
  name,
  reducer,
  ...selectors,
  ...actionCreators,
  ...reactors
}
