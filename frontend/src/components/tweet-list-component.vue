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
        <!-- <tweetCardComponent
          v-for="(tweet, index) in tweets"
          :key="tweet._id || index"
          :tweet="tweet"
          class="mb-3"
        /> -->
        <v-slide-x-transition group>
          <v-card
            v-for="(tweet, index) in tweets"
            :key="tweet._id || index"
            class="ma-0 tweet-item"
          >
            <tweetCardComponent
              :tweet="tweet"
            />
          </v-card>
        </v-slide-x-transition>
        <!-- <transition-group name="tweet" tag="div">
          <div v-for="(tweet, index) in tweets" :key="tweet._id || index" class="tweet-item">
            <tweetCardComponent
              :tweet="tweet"
              class="mb-3"
            />
          </div>
        </transition-group> -->

        <!-- <transition-group name="tweet" tag="div">
          <tweetCardComponent
            v-for="(tweet, index) in tweets"
            :key="tweet._id || index"
            :tweet="tweet"
            class="mb-3"
          />
        </transition-group> -->

        <!-- İLK/ESKİ HALİ
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
      </v-infinite-scroll> -->

      </v-infinite-scroll>
    </v-col>
  </v-row>
</template>

<style scoped>

#scrollable-content {
  overflow: auto;
  max-height: 400px;
}

/* Enter and leave transitions */
/* .tweet-enter-active, .tweet-leave-active {
  transition: opacity 0.6s, transform 0.6s;
} */

/* .tweet-enter, .tweet-leave-to {
  opacity: 0;
  transform: translateY(0px); Slide up slightly
} */

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
