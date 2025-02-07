/* import axios from 'axios'
import io from 'socket.io-client'
// import throttle from 'lodash.throttle'

const socket = io('http://backend:3000')

const mutations = {
  UPDATE_TWEET: 'updateTweet',
  SET_TWEETS: 'setTweets',
  SET_SOCKET_INITIALIZED: 'setSocketInitialized',
  ADD_TWEET: 'addTweet',
  SET_LOADING: 'setLoading',
  REMOVE_TWEET: 'removeTweet'
}

const actions = {
  FETCH_TWEETS: 'fetchTweets',
  FETCH_TWEET: 'fetchTweet',
  SUBMIT_TWEET: 'submitTweet',
  EDIT_TWEET: 'editTweet',
  LIKE_TWEET: 'likeTweet',
  RETWEET_TWEET: 'retweetTweet',
  REPLY_TWEET: 'replyTweet',
  BOOKMARK_TWEET: 'bookmarkTweet',
  SHARE_TWEET: 'shareTweet',
  MORE: 'more',
  PIN_TWEET: 'pinTweet',
  DELETE_TWEET: 'deleteTweet',
  INIT: 'init',
  TEST: 'test'
}

const tweets = {
  namespaced: true,
  state: () => ({
    loading: false,
    tweets: [],
    socketInitialized: false
  }),
  mutations: {
    [mutations.SET_LOADING] (state, val) {
      state.loading = val
    },
    [mutations.SET_TWEETS] (state, tweets) {
      state.tweets = tweets
      console.log('Frontend tweets: ', tweets)
      console.log('TWEET INIT SUCCESSFULL')
      // console.log('TWEET INIT SUCCESSFULL:', this.state.tweets.length)
      // if (Array.isArray(tweets)) {
      //   console.log('Frontend tweets: ', tweets)
      //   state.tweets = tweets
      //   console.log('TWEET INIT SUCCESSFULL:', this.state.tweets.length)
      // } else {
      //   console.error('Expected an array of tweets')
      // }
    },
    [mutations.REMOVE_TWEET] (state, tweetId) {
      state.tweets = state.tweets.filter(tweet => tweet._id !== tweetId)
    },
    [mutations.ADD_TWEET] (state, tweet) {
      state.tweets.unshift(tweet)
    },
    [mutations.UPDATE_TWEET] (state, updatedTweet) {
      const index = state.tweets.findIndex(tweet => tweet._id === updatedTweet._id)
      if (index !== -1) {
        state.tweets.splice(index, 1, updatedTweet) // Update the tweet in the list
      }
    },
    [mutations.SET_SOCKET_INITIALIZED] (state, value) {
      state.socketInitialized = value
    }
  },
  actions: {
    async [actions.TEST] ({ commit }) {
      console.log('Test action')
    },
    async [actions.INIT] ({ commit, state }) {
      if (!state.socketInitialized) {
        socket.on('tweets', tweetData => {
          // console.log(state.tweets.length)
          commit(mutations.SET_TWEETS, tweetData)
        })
        commit(mutations.SET_SOCKET_INITIALIZED, true)
      }
      //   const fetchTweets = throttle(() => dispatch(actions.FETCH_TWEETS), 3000)

      //   socket.on('tweets updated', fetchTweets)
      console.log('tweets store Initialized')
    },
    async [actions.FETCH_TWEETS] ({ dispatch, state }) {
      if (!state.socketInitialized) {
        await dispatch(actions.INIT)
      }
    },
    // async [actions.FETCH_TWEETS] ({ commit }, userHandle) {
    //   try {
    //     const response = await axios.get(`/${userHandle}/tweets`)
    //     console.log('tweets fetched for this user:', userHandle)
    //     commit(mutations.SET_TWEETS, response.data)
    //   } catch (e) {
    //     console.error('Error fetching tweets:', e)
    //   }
    // },
    async [actions.FETCH_TWEET] ({ commit }, { userHandle, tweetId }) {
      try {
        const response = await axios.get(`/${userHandle}/tweets/${tweetId}`)
        commit(mutations.UPDATE_TWEETS, response.data)
      } catch (e) {
        console.error('Error fetching tweet:', e)
      }
    },
    async [actions.SUBMIT_TWEET] ({ commit, dispatch }, { userHandle, content }) {
      console.log('reached SUBMIT_TWEET(outside try)')
      // alert('reached SUBMIT_TWEET(outside try)')
      try {
        console.log('reached SUBMIT_TWEET(inside try)')
        // alert('reached SUBMIT_TWEET(inside try)')
        console.log('userHandle:', userHandle)
        console.log('content:', content)
        const response = await axios.post(`/api/tweets/${userHandle}`, { content })
        console.log('SUBMIT_TWEET response:', response)
        commit(mutations.ADD_TWEET, response.data)
        dispatch(actions.FETCH_TWEETS)
      } catch (e) {
        console.error('Error with Axios:', e.response || e.message || e)
        // console.error('Error submitting tweet:', e)
      }
    },
    async [actions.DELETE_TWEET] ({ dispatch, commit }, { userHandle, tweetId }) {
      try {
        console.log('userHandle:', userHandle)
        console.log('tweetId:', tweetId)
        await axios.delete(`/api/tweets/${userHandle}/${tweetId}`)
        commit(mutations.REMOVE_TWEET, tweetId)
        dispatch(actions.FETCH_TWEETS)
      } catch (e) {
        console.error('Error deleting tweet:', e)
      }
    },
    async [actions.EDIT_TWEET] ({ dispatch, commit }, { userHandle, tweetId, newTweetBody }) {
      try {
        const response = await axios.patch(`/api/tweets/${userHandle}/${tweetId}`, { newTweetBody })
        commit('UPDATE_TWEET', response.data)
        dispatch(actions.FETCH_TWEETS)
      } catch (error) {
        console.error('Error updating tweet:', error)
      }
    },
    // async [actions.PATCH_TWEET] ({ dispatch }, { userHandle, tweetId, tweetUpdates }) {
    //   try {
    //     await axios.patch(`/${userHandle}/tweets/${tweetId}`, tweetUpdates)
    //     dispatch(actions.FETCH_TWEETS, userHandle)
    //   } catch (e) {
    //     console.error('Error updating tweet:', e)
    //   }
    // },
    async [actions.LIKE_TWEET] ({ dispatch }, { tweetId, action }) {
      await dispatch(actions.LIKE, { tweetId, action })
    },
    async [actions.BOOKMARK_TWEET] ({ dispatch }, { tweetId, action }) {
      await dispatch(actions.BOOKMARK, { tweetId, action })
    },
    // async [actions.DELETE_TWEET] ({ state, dispatch }, tweetId) {
    //   await axios.delete(`/tweets/${state.tweetId}`)
    //   await dispatch(actions.FETCH_TWEETS)
    // },
    async [actions.PIN_TWEET] ({ dispatch }, { tweetId, action }) {
      await dispatch(actions.PATCH_TWEET, { tweetId, action })
    }
    // async [actions.PATCH_TWEET] ({ state, commit, dispatch }, { tweetId, action }) {
    //   commit(mutations.SET_LOADING, true)

    //   try {
    //     await axios.patch(`/tweets/${state.tweetId}`, { action })
    //   } catch (e) {
    //     // throw e
    //     console.log(e)
    //   } finally {
    //     commit(mutations.SET_LOADING, false)
    //     await dispatch(actions.FETCH_TWEETS)
    //   }
    // },
    // [actions.UPDATE_TWEETS] ({ commit }, tweets) {
    //   commit(mutations.UPDATE_TWEETS, tweets)
    // }
  }
}

export default tweets
 */

import axios from 'axios'
import { io } from 'socket.io-client'

const mutations = {
  SET_TWEETS: 'setTweets',
  INIT_SOCKET: 'initSocket',
  ADD_TWEET: 'addTweet',
  APPEND_TWEETS: 'appendTweets',
  UPDATE_TWEET: 'updateTweet',
  REMOVE_TWEET: 'removeTweet'
}

const actions = {
  INIT_SOCKET: 'initSocket',
  FETCH_TWEETS: 'fetchTweets',
  SUBMIT_TWEET: 'submitTweet',
  UPDATE_TWEET: 'updateTweet',
  REMOVE_TWEET: 'removeTweet'
}

export default {
  namespaced: true,
  state: {
    tweets: [],
    totalTweets: 0,
    socket: null
  },
  mutations: {
    [mutations.SET_TWEETS] (state, { tweets, total }) {
      state.tweets = tweets
      state.totalTweets = total
    },
    [mutations.INIT_SOCKET] (state, socket) {
      state.socket = socket
    },
    [mutations.ADD_TWEET] (state, tweet) {
      state.tweets.unshift(tweet)
    },
    [mutations.APPEND_TWEETS] (state, tweets) {
      state.tweets.push(...tweets)
    },
    [mutations.UPDATE_TWEET] (state, updatedTweet) {
      const index = state.tweets.findIndex(tweet => tweet._id === updatedTweet._id)
      if (index !== -1) {
        state.tweets.splice(index, 1, updatedTweet)
      }
    },
    [mutations.REMOVE_TWEET] (state, tweetId) {
      state.tweets = state.tweets.filter(tweet => tweet._id !== tweetId)
    }
  },
  actions: {
    async [actions.INIT_SOCKET] ({ commit }) {
      if (!this.state.socket) {
        const socket = io('http://localhost:3000' || process.env.VUE_APP_SOCKET_PATH)

        socket.on('connect', () => {
          console.log('TWEET SOCKET CONNECTED')

          socket.on('tweets', (tweets) => {
            commit(mutations.SET_TWEETS, tweets)
          })

          socket.on('newTweet', (newTweet) => {
            commit(mutations.ADD_TWEET, newTweet)
          })

          socket.on('editTweet', (updatedTweet) => {
            commit(mutations.UPDATE_TWEET, updatedTweet)
          })

          socket.on('deleteTweet', (tweetId) => {
            commit(mutations.REMOVE_TWEET, tweetId)
          })
        })

        commit(mutations.INIT_SOCKET, socket)
      }
      /* try {
        socket.on('tweets', (tweets) => {
          commit(mutations.SET_TWEETS, tweets)
          console.log('TWEET INIT SUCCESSFULL')
          console.log('state tweets: ', this.tweets)
        })

        socket.on('newTweet', (tweet) => {
          dispatch(actions.FETCH_TWEETS)
        })

        commit(mutations.INIT_SOCKET, socket)
      } catch (e) {
        console.error('Error initializing socket:', e)
      } */
    },
    async [actions.FETCH_TWEETS] ({ commit }, { tab, userHandle = null, page = 1, limit = 10 }) {
      try {
        let endpoint
        if (tab === 1) {
          endpoint = '/api/tweets/for-you'
        } else if (tab === 2) {
          endpoint = '/api/tweets/following'
        } else if (userHandle) {
          endpoint = `/api/tweets/${userHandle}`
        }

        const response = await axios.get(endpoint, {
          params: { page, limit }
        })

        commit(mutations.APPEND_TWEETS, response.data)
      } catch (e) {
        console.error('Error fetching tweets:', e)
      }
    },
    async [actions.SUBMIT_TWEET] ({ commit, state }, tweetData) {
      try {
        // const response = await axios.post(`/api/tweets/${userHandle}`, { content })
        if (state.socket) {
          state.socket.emit('newTweet', tweetData)

          state.socket.on('newTweet', (newTweet) => {
            commit(mutations.ADD_TWEET, newTweet)
          })
        }
      } catch (e) {
        console.error('Error creating tweet:', e)
      }
    }
    // async [actions.UPDATE_TWEET] ({ dispatch, state }, { userHandle, tweet }) {
    //   try {
    //     const response = await axios.patch(`/api/tweets/${userHandle}/${tweet._id}`, tweet)
    //     state.socket.emit('updateTweet', response.data)
    //   } catch (e) {
    //     console.error('Error updating tweet:', e)
    //   }
    // },
    // async [actions.DELETE_TWEET] ({ dispatch, state }, { userHandle, tweetId }) {
    //   try {
    //     await axios.delete(`/api/tweets/${userHandle}/${tweetId}`)
    //     state.socket.emit('deleteTweet', { userHandle, tweetId })
    //   } catch (e) {
    //     console.error('Error deleting tweet:', e)
    //   }
    // }
  }
}
