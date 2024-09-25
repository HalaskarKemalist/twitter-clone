<script>
import tweetListComponent from '../components/tweet-list-component.vue'

export default {
  name: 'user-profile-feed-component',
  components: {
    tweetListComponent
  },
  data () {
    return {
      activeTab: 0,
      tabs: ['Posts', 'Replies', 'Likes'],
      posts: [],
      replies: [],
      likes: [],
      loadingPosts: false,
      loadingReplies: false,
      loadingSubs: false
    }
  },
  methods: {
    loadMorePosts () {
      this.loadingPosts = true
      // Fetch more posts from API
      setTimeout(() => {
        this.posts.push(
          { title: 'New Post', content: 'This is the content of the new post' }
        )
        this.loadingPosts = false
      }, 2000)
    },
    loadMoreReplies () {
      this.loadingReplies = true
      // Fetch more replies from API
      setTimeout(() => {
        this.replies.push(
          { title: 'New Reply', content: 'This is the content of the new reply' }
        )
        this.loadingReplies = false
      }, 2000)
    },
    loadMoreLikes () {
      this.loadingLikes = true
      // Fetch more likes from API
      setTimeout(() => {
        this.likes.push(
          { title: 'New Like', content: 'This is the content of the new like' }
        )
        this.loadingLikes = false
      }, 2000)
    }
  }
}
</script>

<template>
    <v-container>
        <v-tabs v-model="activeTab" background-color="transparent">
            <v-tab v-for="(tab, index) in tabs" :key="index">
                {{ tab }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
            <v-tab-item>
                <tweet-list-component
                :tweets="posts"
                :loading-tweets="loadingPosts"
                @loadMoreTweets="loadMorePosts"
                />
            </v-tab-item>

            <v-tab-item>
                <tweet-list-component
                :tweets="replies"
                :loading-tweets="loadingReplies"
                @loadMoreTweets="loadMoreReplies"
                />
            </v-tab-item>

            <v-tab-item>
                <tweet-list-component
                :tweets="likes"
                :loading-tweets="loadingLikes"
                @loadMoreTweets="loadMoreLikes"
                />
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>
