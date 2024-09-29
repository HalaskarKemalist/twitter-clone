import axios from 'axios'

const mutations = {
  SET_USERS: 'setUsers'
}

const actions = {
  FETCH_USERS: 'fetchUsers',
  INIT: 'init'
}

const users = {
  namespaced: true,
  state: () => ({
    users: []
  }),
  mutations: {
    [mutations.SET_USERS] (state, users) {
      state.users = users
      console.log('set user içi', state.users.length)
    }
  },
  actions: {
    async [actions.INIT] ({ dispatch }) {
      await dispatch(actions.FETCH_USERS)
      console.log('users store Initialized')
    },
    async [actions.FETCH_USERS] ({ commit }) {
      const response = await axios.get('/api/users/')
      console.log('response:', response)
      console.log('users:', response.data)
      commit(mutations.SET_USERS, response.data)
    }
  }
}

export default users
