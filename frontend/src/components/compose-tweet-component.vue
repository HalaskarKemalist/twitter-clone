<script>
// add counter 20/200 with computed

import { mapState, mapActions } from 'vuex'
// import TweetActions from '../components/TweetActions.vue'
export default {
  name: 'compose-tweet-component',
  data: () => ({
    rules: [v => (v === undefined || v.length <= 280) || 'Max 280 characters'],
    tweet: {
      author: '', // 66aa59ff7956004317130b67
      body: ''
    },
    localUser: null,
    loading: false
  }),
  computed: {
    ...mapState('account', ['user']),
    tweetCounter () {
      return `${this.tweet.body.length}/280`
    }
  },
  methods: {
    ...mapActions('tweets', ['submitTweet']),
    async sendTweet () {
      try {
        this.tweet.author = this.localUser
        console.log('local user: ', this.localUser.handle)
        console.log('local user assigned to tweet.author: ', this.tweet.author.handle)
        console.log('tweet body: ', this.tweet.body)

        await this.submitTweet({ userHandle: this.tweet.author.handle, tweet: this.tweet })

        // this.loading = true
        // setTimeout(() => {
        //   this.loading = false
        //   this.tweet.body = '' // Reset the tweet body after sending
        // }, 2000)
      } catch (e) {
        console.log(e)
        console.error(this.tweet.body, this.tweet.author._id, this.localUser.handle, 'No user handle found')
      }
    }
  },
  async created () {
    this.localUser = this.user
    // this.user = this.$store.state.account.user
    console.log('successfull setting received component from store: ', this.localUser)
    console.log('user handle from store: ', this.user.handle)
    console.log('component local handle: ', this.localUser.handle)
    if (!this.user) {
      // Optionally, handle cases where handle might not be available yet.
      console.error('User handle not available. Redirect to login or handle error')
    }
  }
  // watch: {
  //   loading (val) {
  //     if (!val) return

  //     setTimeout(() => {
  //       this.loading = false
  //     }, 2000)
  //   }
  // },
  // props: {
  //   tweetText: String
  // },
  // methods: {
  //   ...mapActions(['submitTweet']),
  //   sendTweet () {
  //     this.submitTweet(this.tweet)
  //   }
  // },
  // components: {
  //   TweetActions
  // }
}
</script>

<template>
  <v-form class="compose-tweet-form">
    <div class="tweet-header">
      <img class="profile-pic" src="https://via.placeholder.com/40" alt="Profile Picture" />
      <v-btn icon small class="dropdown-btn">
        Everyone
        <v-icon small>mdi-chevron-down</v-icon>
      </v-btn>
    </div>

    <v-textarea
      v-model="tweet.body"
      placeholder="What is happening?!"
      auto-grow
      counter="280"
      class="tweet-textarea"
      :rules="rules"
    ></v-textarea>

    <v-row justify="space-between" class="tweet-footer">
      <div class="tweet-actions">
        <v-btn icon>
          <v-icon>mdi-image</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-gif</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-chart-timeline-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-emoticon-happy-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-camera</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-map-marker-outline</v-icon>
        </v-btn>
      </div>

      <v-btn :disabled="loading || tweet.body.length > 280" color="primary" class="tweet-button" @click="sendTweet">
        Post
      </v-btn>
    </v-row>

    <!-- <v-textarea
    bg-color="whitesmoke"
    placeholder="What is happening?!"
    counter></v-textarea>
    <v-btn color="primary" class="button-color">Post</v-btn>
    <TweetActions /> -->
  </v-form>
    <!-- <h1>Compose Tweet</h1> -->
      <!-- <v-textarea
        class="custom-counter"
        :rules="rules"
        white--counter counter
        v-model="tweet.body">
      </v-textarea> -->
        <!-- <v-btn
          base-color="blue"
          rounded
          @click="sendTweet"
          :disabled="loading"
          >{{ loading ? 'Loading' : 'Post' }}
        </v-btn> -->
</template>

<style scoped>
.compose-tweet-form {
  background-color: #15202b; /* Twitter dark background */
  padding: 1rem;
  border-radius: 15px;
  max-width: 600px;
  margin: auto;
}

.tweet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.dropdown-btn {
  color: #1da1f2;
  text-transform: none;
}

.tweet-textarea {
  background-color: #192734;
  color: white;
  border-radius: 10px;
  border: none;
  margin-bottom: 0.5rem;
  font-size: 18px;
}

.tweet-textarea .v-counter {
  color: #8899a6 !important; /* Light gray for counter */
}

.tweet-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tweet-actions v-btn {
  color: #1da1f2;
}

.tweet-button {
  background-color: #1da1f2;
  color: white;
  font-weight: bold;
}

.tweet-button[disabled] {
  background-color: #8899a6; /* Disabled button gray */
}
</style>
<!-- <style>
.custom-counter .v-counter {
  color: white !important; /* Make counter text white */
}

.button-color {
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;
}
</style> -->
