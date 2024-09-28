import axios from 'axios'

const mutations = {
  SET_USER: 'setUser'
}

const actions = {
  RESEND_VERIFICATION_EMAIL: 'resendVerificationEmail',
  REGISTER_USER: 'registerUser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  FETCH_USER: 'fetchUser',
  UPDATE_PROFILE: 'updateProfile',
  FOLLOW_USER: 'followUser',
  INIT: 'init'
}

const account = {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    [mutations.SET_USER] (state, user) {
      state.user = user
    }
  },
  actions: {
    async [actions.INIT] ({ dispatch }) {
      await dispatch(actions.FETCH_USER)
      console.log('account store Initialized', this.user)
    },
    async [actions.REGISTER_USER] (store, user) {
      console.log('actiona geldi')
      return axios.post('/api/auth/register', user)
    },
    async [actions.LOGIN] ({ commit }, credentials) {
      const user = await axios.post('/api/auth/session', credentials)

      commit(mutations.SET_USER, user.data)
    },
    async [actions.LOGOUT] ({ commit }) {
      await axios.delete('/api/auth/session')

      commit(mutations.SET_USER, null)
    },
    async [actions.FETCH_USER] ({ commit }) {
      const user = await axios.get('/api/auth/session')

      commit(mutations.SET_USER, user.data)
    },
    async [actions.UPDATE_PROFILE] (store, profile) {
      await axios.patch('/api/account/update-profile', profile)
    },
    async [actions.RESEND_VERIFICATION_EMAIL] (store, email) {
      await axios.post('/api/auth/outgoing-verification-emails', { email })
    }
  }
}

export default account
