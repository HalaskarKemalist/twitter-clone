import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async fetchUsers () {
      const request = await axios.get('/users')
      return request.data
    },
    async fetchUser ({ state }, userId) {
      const request = await axios.get(`/users/${userId}`)
      return request.data
    },
    async followUser ({ dispatch }, { userId, user2Id }) {
      const request = await axios.post(`/users/${userId}/following`, {
        user2Id
      })

      return request.data
    }
  },
  modules: {
  }
})
