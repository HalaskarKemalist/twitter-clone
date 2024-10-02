<script>
import tweetCardComponent from '../components/tweet-card-component.vue'

export default {
  name: 'tweet-list-component',
  components: {
    tweetCardComponent
  },
  props: ['tweets'],
  data () {
    return {
      loadingTweets: false
    }
  },
  methods: {
    async loadMoreTweets () {
      if (!this.loadingTweets) {
        this.loadingTweets = true
        await this.$emit('loadMoreTweets')
        this.loadingTweets = false
      }
    }
  }
}
</script>

<template>
  <v-row>
    <v-col>
      <v-infinite-scroll
        :on-bottom="loadMoreTweets"
        :disabled="loadingTweets"
        :scroll-target="'#scrollable-content'"
      >
        <tweetCardComponent
          v-for="(tweet, index) in tweets"
          :key="tweet._id || index"
          :tweet="tweet"
          class="mb-3"
        />
      </v-infinite-scroll>
    </v-col>
  </v-row>
</template>

<style scoped>
#scrollable-content {
  overflow: auto;
  max-height: 400px;
}
</style>

<!-- <style>
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
</style> -->
