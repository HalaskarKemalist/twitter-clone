<script>
export default {
  name: 'profile-card-component',
  data () {
    return {
      loading: false
    }
  },
  props: ['user'],
  methods: {
    setupProfile () {
      this.$router.push('/setup-profile')
    }
  }
}
</script>

<template>
    <v-card class="profile-card" elevation="3" height="550">
        <v-img
            class="align-end text-white"
            height="200"
            :src="user.header"
            cover
            >
        </v-img>

        <v-card-title>
            <v-row justify="space-between">
                <v-col cols="4">
                    <v-avatar size="100" class="profile-avatar">
                        <img :src="user.profilePicture" alt="Profile Picture" />
                    </v-avatar>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-fade-transition mode="out-in">
                        <v-btn
                            flat
                            class="button"
                            color="primary"
                            @click="setupProfile"
                        >Setup Profile</v-btn>
                    </v-fade-transition>
                </v-col>
            </v-row>
        </v-card-title>

        <v-card-subtitle>
            <v-row>
                <v-col cols="auto">
                    <h2 class="profile-name">{{ user.name }}</h2>
                    <h3 class="profile-handle">@{{ user.handle }}</h3>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <p class="profile-bio">{{ user.bio }}</p>
                </v-col>
            </v-row>

        </v-card-subtitle>
        <v-card-text>

            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="auto" class="profile-detail">
                    <v-icon left>mdi-map-marker</v-icon> {{ user.location }}
                </v-col>

                <v-col cols="auto" class="profile-detail">
                    <v-icon left>mdi-link</v-icon>&nbsp;
                    <a :href="user.website" target="_blank">{{ user.website }}</a>
                </v-col>

                <v-col cols="auto" class="profile-detail">
                    <v-icon left>mdi-calendar</v-icon>&nbsp; Joined {{ new Date(user.createdAt).toLocaleDateString() }}
                </v-col>
            </v-row>
            <v-row class="profile-stats">
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <span class="stat">{{ user.tweets.length }}</span> Posts
                </v-col>
                <v-col cols="auto">
                    <span class="stat">{{ user.followers.length }}</span> Followers
                </v-col>
                <v-col cols="auto">
                    <span class="stat">{{ user.following.length }}</span> Following
                </v-col>
            </v-row>

        </v-card-text>
    </v-card>
</template>

<style scoped>
.profile-card {
}

.profile-avatar {
  border: 2px solid #1da1f2; /* Twitter blue border */
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.profile-handle {
  font-size: 1rem;
  color: #657786; /* Twitter grey color */
}

.profile-bio {
  margin: 10px 0;
  color:black;
}

.profile-detail {
  text-align: center;
}

.profile-stats {
  text-align: center;
}

.stat {
  font-size: 1.1rem;
  font-weight: bold;
}

a {
  color: #1da1f2; /* Twitter blue color */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.button {
    background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
    color: white !important;
}
</style>
