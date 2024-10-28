import axios from 'axios'

const mutations = {
  SET_USER: 'setUser',
  ADD_FOLLOWING: 'addFollowing',
  REMOVE_FOLLOWING: 'removeFollowing',
  SET_FOLLOWING: 'setFollowing',
  SET_FOLLOWERS: 'setFollowers'
}

const actions = {
  RESEND_VERIFICATION_EMAIL: 'resendVerificationEmail',
  REGISTER_USER: 'registerUser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  FETCH_USER: 'fetchUser',
  UPDATE_PROFILE: 'updateProfile',
  FOLLOW_USER: 'followUser',
  UNFOLLOW_USER: 'unfollowUser',
  FETCH_FOLLOWING: 'fetchFollowing',
  FETCH_FOLLOWERS: 'fetchFollowers',
  INIT: 'init'
}

const account = {
  namespaced: true,
  state: () => ({
    user: null,
    following: [],
    followers: []
  }),
  mutations: {
    [mutations.SET_USER] (state, user) {
      state.user = user
    },
    [mutations.ADD_FOLLOWING] (state, userId) {
      if (!state.following.includes(userId)) {
        state.following.push(userId)
      }
    },
    [mutations.REMOVE_FOLLOWING] (state, userId) {
      state.following = state.following.filter(id => id !== userId)
    },
    [mutations.SET_FOLLOWING] (state, following) {
      state.following = following
    },
    [mutations.SET_FOLLOWERS] (state, followers) {
      state.followers = followers
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
    },
    async [actions.FOLLOW_USER] ({ commit, dispatch }, userId) {
      try {
        await axios.post(`/api/users/${userId}/followers`)
        commit(mutations.ADD_FOLLOWING, userId)
        dispatch(actions.FETCH_FOLLOWING)
        console.log(`Followed user: ${userId}`)
      } catch (error) {
        console.error('Failed to follow user:', error)
      }
    },
    async [actions.UNFOLLOW_USER] ({ commit, dispatch }, userId) {
      try {
        await axios.delete(`/api/users/${userId}/followers`)
        commit(mutations.REMOVE_FOLLOWING, userId)
        dispatch(actions.FETCH_FOLLOWING)
        console.log(`Unfollowed user: ${userId}`)
      } catch (error) {
        console.error('Failed to unfollow user:', error)
      }
    },
    async [actions.FETCH_FOLLOWING] ({ commit }) {
      try {
        const response = await axios.get('/api/users/following')
        console.log('Fetched following:', response.data)
        commit(mutations.SET_FOLLOWING, response.data)
      } catch (error) {
        console.error('Failed to fetch following users:', error)
      }
    },
    async [actions.FETCH_FOLLOWERS] ({ commit }) {
      try {
        const response = await axios.get('/api/users/followers')
        commit(mutations.SET_FOLLOWERS, response.data)
      } catch (error) {
        console.error('Failed to fetch followers:', error)
      }
    }
  }
}

export default account
