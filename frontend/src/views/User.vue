<script>
import { mapActions } from 'vuex'
import composeTweetComponent from '../components/compose-tweet-component.vue'
import tweetCardComponent from '../components/tweet-card-component.vue'

export default {
  name: 'UserView',
  components: {
    composeTweetComponent,
    tweetCardComponent
  },
  data () {
    return {
      isLoading: true,
      user: {},
      users: []
    }
  },
  async mounted () {
    this.user = await this.fetchUser(this.$route.params.userId)
    this.users = await this.fetchUsers()
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchUsers', 'followUser']),
    async followUser2AndUpdateUser ({ userId, user2Id }) {
      await this.followUser({ userId, user2Id })
      this.user = await this.fetchUser(this.$route.params.userId)
    }
  }
}
</script>

<template lang="pug">
.user
    p(v-if="isLoading") Please wait...
    div(v-else)
        h1 User Detail
        p {{ user.name }}

        h2 Followers:
        p There are {{ user.followers.length }} followers:
        div(v-if="user.followers.length")
            ol
                li(v-for="follower in user.followers")
                    |   {{ follower.name }} followed {{ user.name }}
        p(v-else) No followers

        h2 Followings:
        p There are {{ user.following.length }} following:
        div(v-if="user.following.length")
            ol
                li(v-for="followingCurrent in user.following")
                    |   {{ user.name }} followed {{ followingCurrent.name }}
        p(v-else) No followings

        h2 Tweets:
        p There are {{ user.tweets.length }} tweets.

        div(v-if="user.tweets.length")
            ol
                li(v-for="tweet in user.tweets")
                    ul {{ tweet.body }}
                    ul {{ tweet.createdAt }}
                    br
        p(v-else) No tweets

        h2 Follow a new person
        div(v-if="users.length")
            h3 Users
            ol
                li(v-for="user2 in users")
                  | {{ user2.name }} &nbsp;
                  button.followUser(@click="followUser2AndUpdateUser({userId: user._id, user2Id: user2._id})") Follow user
composeTweetComponent
tweetCardComponent
</template>
