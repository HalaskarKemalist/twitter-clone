<script>
import { mapState } from 'vuex'
import userBannerComponent from './user-banner-component.vue'

export default {
  name: 'user-to-follow-component',
  components: {
    userBannerComponent
  },
  data () {
    return {
      visibleUserCount: 3,
      userIncrement: 3
    }
  },
  computed: {
    ...mapState('users', ['users']),
    visibleUsers () {
      return this.users.slice(0, this.visibleUserCount)
    },
    canShowMore () {
      return this.users.length > this.visibleUserCount
    }
  },
  methods: {
    loadMoreUsers () {
      this.visibleUserCount += this.userIncrement
    }
  },
  created () {
    // Debugging: Check if the users array is correctly coming from Vuex
    console.log('Fetched users:', this.users)
    console.log('First user:', this.users[0].handle)
    console.log('Second user:', this.users[1].handle)
  }
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <!-- Who to follow section -->
                <v-card color="pink">
                    <v-card-title>Who to follow</v-card-title>
                    <v-list dense>
                        <v-list-item v-for="user in visibleUsers" :key="user._id">
                            <userBannerComponent :user="user" />
                        </v-list-item>
                    </v-list>

                    <v-card-actions v-if="canShowMore">
                        <v-btn
                            @click="loadMoreUsers"
                            color="primary"
                        >
                            Show more
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-list {
  max-height: 400px; /* Adjust the height based on your design */
  overflow-y: auto;
}

.v-list::-webkit-scrollbar {
  width: 6px;
}

.v-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.v-list::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
