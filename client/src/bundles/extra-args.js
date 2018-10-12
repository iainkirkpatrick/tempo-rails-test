// TODO: probably use lodash/merge to merge config correctly

export default {
  name: 'extra-args',
  getExtraArgs: (store) => {
    return {
      apiFetch: (url, config = {}) => {
        const authHeaders = store.getState().auth.headers
        return fetch(`/api/${url}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authHeaders,
            ...config.headers
          },
          ...config
        })
      }
    }
  }
}
