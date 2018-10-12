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
  selectPeople: (state) => state.people.people
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

export default {
  name,
  reducer,
  ...selectors,
  ...actionCreators
}
