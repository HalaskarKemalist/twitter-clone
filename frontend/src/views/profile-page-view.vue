<script>
import { mapState } from 'vuex'
import profileCardComponent from '../components/profile-card-component'
// import userProfileFeedComponent from '../components/user-profile-feed-component'
import userToFollowComponent from '@/components/user-to-follow-component.vue'
import leftSidebarComponent from '@/components/left-sidebar-component.vue'

export default {
  name: 'profile-page-view',
  components: {
    profileCardComponent,
    userToFollowComponent,
    leftSidebarComponent
  },
  computed: {
    ...mapState('account', ['user']),
    ...mapState('users', ['users'])
  },
  created () {
    // Debugging: Check if the user object is correctly coming from Vuex
    console.log('profile page view user:', this.user)
  }
}
</script>

<template>
  <v-container>
    <v-row>

      <v-col cols="2" class="left-sidebar">
        <leftSidebarComponent :user="user"/>
      </v-col>

      <v-col cols="6" class="main-feed">
        <div v-if="user">
          <profileCardComponent :user="user" class="pa-0"/>
          <!-- <userProfileFeedComponent /> -->
        </div>
        <div v-else>
          <v-alert variant="text" color="primary" style="margin: 10px 0;">Hmm...this user doesn’t exist. Try searching for someone else.</v-alert>
        </div>
      </v-col>

      <v-col cols="4" class="right-sidebar">
        <userToFollowComponent :users="users"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

.main-feed {
  padding: 0%;
}

.right-sidebar {
  border-left: 1px solid rgba(0, 0, 0, 1);
}

.left-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 1);
  padding: 0%;
}

</style>
