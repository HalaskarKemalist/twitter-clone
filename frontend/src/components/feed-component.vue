<script>
import { mapActions, mapState } from 'vuex'
import tweetListComponent from '../components/tweet-list-component.vue'
import composeTweet from '../components/compose-tweet-component.vue'

export default {
  name: 'feed-component',
  data: () => ({
    currentTab: 1,
    tabs: [
      { text: 'For you', value: 1 },
      { text: 'Following', value: 2 }
    ]
  }),
  components: {
    composeTweet,
    tweetListComponent
  },
  computed: {
    ...mapState('tweets', ['tweets'])
  },
  methods: {
    ...mapActions('tweets', ['fetchTweets']),
    switchTab (value) {
      this.currentTab = value // Switch between tabs
      this.fetchTweets({ tab: this.currentTab }) // Fetch tweets for the respective tab
    },
    async loadMoreTweets () {
      await this.fetchTweets({ tab: this.currentTab, page: this.page })
      this.page += 1
    }
  }
}
</script>

<template>
  <v-card elevation="0" class="feed-sheet">
    <v-tabs
      v-model="currentTab"
      align-tabs="center"
      color="primary"
      background-color="white"
      height="60"
      class="px-4"
      slider-color="#66aaf7"
      fixed-tabs
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        @click="switchTab(tab.value)"
      >
        {{ tab.text }}
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="currentTab">
      <v-tabs-window-item v-for="n in 2" :key="n" :value="n">
        <!-- <div class="tab-content">
          <composeTweet class="compose-tweet" />
          <tweetListComponent :tweets="tweets" />
        </div> -->
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <composeTweet class="border-thin" elevation="0"/>
              <tweetListComponent :tweets="tweets" @loadMoreTweets="loadMoreTweets"/>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

  </v-card>
</template>

<style scoped>
.feed-sheet {
  border-radius: 12px;
  min-height: 50vh;
}

.v-tabs {
  border-bottom: 1px solid #e0e0e0; /* Subtle bottom border */
}

.v-tab {
  font-weight: 500;
  font-size: 16px;
  text-transform: none;
  color: #424242; /* Dark grey for tab text */
}

.v-tab:hover {
  color: #66aaf7; /* Highlight on hover */
}

.v-tabs-items {
  background-color: #ffffff; /* Pure white for the content background */
  border-radius: 0 0 12px 12px;
}

.v-tab-item {
  padding: 16px 0; /* Padding between components */
}

.compose-tweet {
  margin-bottom: 24px; /* Spacing below compose tweet */
}

.tab-content {
  padding: 16px;
}
</style>
