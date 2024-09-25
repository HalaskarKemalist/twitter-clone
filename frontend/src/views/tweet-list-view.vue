<script>
import { mapState, mapActions } from 'vuex'
import tweetCardComponent from '../components/tweet-card-component.vue'

export default {
  name: 'tweet-list-view',
  data () {
    return {
      tweets: [],
      loading: false,
      page: 1,
      limit: 10
    }
  },
  components: {
    tweetCardComponent
  },
  computed: {
    ...mapState('tweets', ['tweets'])
  },
  methods: {
    ...mapActions('tweets', ['fetchTweets']),
    async loadMoreTweets () {
      await this.fetchTweets()
    }
  },
  async created () {
    await this.fetchTweets()
  }
}
</script>

<template>
    <h1>TweetList</h1>
    <v-infinite-scroll :tweets="tweets" @load="loadMoreTweets" class="custom-scroll">
        <v-col v-for="tweet in tweets" :key="tweet._id">
            <tweetCardComponent :tweet="tweet" />
        </v-col>
    </v-infinite-scroll>
</template>

<style>
.custom-scroll {
  overflow: hidden; /* Hides scrollbar */
  overflow-y: scroll; /* Enables vertical scrolling */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.custom-scroll::-webkit-scrollbar {
  display: none;  /* Hides scrollbar in Chrome, Safari, and Opera */
}

.fill-height {
  height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
}
</style>
