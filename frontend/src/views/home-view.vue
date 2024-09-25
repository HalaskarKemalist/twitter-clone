<script>
import feedComponent from '../components/feed-component.vue'

export default {
  name: 'home-view',
  data () {
    return {
    }
  },
  components: {
    feedComponent
  }
}
</script>

<template>
  <feedComponent />
</template>

//- v-avatar(:image="'default-avatar-url'", color="grey-darken-3")
  //- p(v-if="isLoading") Please wait...
  //- div(v-else)
  //-   h1 Tweets
  //-   p There are {{ tweets.length }} tweets.

  //-   div(v-if="tweets.length")
  //-       ol
  //-           li(v-for="tweet in tweets" :key="tweet._id")
  //-             Tweet(:tweet="tweet")
  //-   p(v-else) No tweets
