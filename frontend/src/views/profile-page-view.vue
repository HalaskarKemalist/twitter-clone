<script>
import { mapState } from 'vuex'
import profileCardComponent from '../components/profile-card-component'
// import userProfileFeedComponent from '../components/user-profile-feed-component'

export default {
  name: 'profile-page-view',
  components: {
    profileCardComponent
  },
  /* data () {
    return {
      user: null
      // user: {
      //   profilePicture: 'https://cdn.vuetifyjs.com/images/john.jpg',
      //   header: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      //   displayName: 'Aslan',
      //   handle: 'aslan',
      //   bio: 'means lion in English',
      //   location: 'Ankara',
      //   website: 'website',
      //   joinDate: '2022-01-15',
      //   postCount: 320,
      //   followersCount: 120,
      //   followingCount: 180
      // }
    }
  }, */
  computed: {
    ...mapState('account', ['user'])
  }
}
</script>

<template>
    <v-sheet width="600">
        <v-row justify="center">
            <v-col>
              <div v-if="user">
                <!-- <h1>profile-page-view</h1> -->
                <profileCardComponent :user="user"/>
                <!-- <userProfileFeedComponent /> -->
              </div>
              <div v-else>
                <v-alert variant="text" color="primary" style="margin: 10px 0;">Hmm...this user doesn’t exist. Try searching for someone else.</v-alert>
              </div>
            </v-col>
        </v-row>
    </v-sheet>
</template>
