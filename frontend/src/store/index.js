/* // import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'

import account from './account'
import tweets from './tweets'

// Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_BASE_PATH
axios.defaults.withCredentials = true

const store = createStore({
  modules: {
    account,
    tweets
  }
})

export default async function init () {
  await store.dispatch('account/init')
  await store.dispatch('tweets/init')
  console.log('init e girdi')
  console.log('State after init:', store.state)
  console.log('modules after init:', store.modules)
  return store
} */
import Vuex from 'vuex'
import account from './account'
import tweets from './tweets'
import users from './users'

// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account,
    tweets,
    users
  },
  strict: process.env.NODE_ENV !== 'production' // Enables strict mode in development
})

// Optional: Initialize any state if needed
store.dispatch('account/init')
store.dispatch('tweets/init')
store.dispatch('users/init')

export default store
