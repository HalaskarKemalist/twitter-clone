<script>

export default {
  name: 'user-banner-component',
  methods: {
    followUser () {
      // Handle follow action
      console.log(`Followed ${this.user.name}`)
    }
  },
  props: ['user']
}
</script>

<template>
    <v-banner lines="two" class="user-banner" bg-color="green">
        <template v-slot:icon>
            <v-avatar size="56">
                <img :src="user.profilePicture" alt="User Avatar" />
            </v-avatar>
        </template>

        <div class="user-info">
            <v-row>
                <v-col>
                    <!-- User's name -->
                    <v-row>
                        <v-col>
                        <span class="font-weight-bold">{{ user.name }}</span>
                        <span class="grey--text">@{{ user.handle }}</span>
                        </v-col>
                    </v-row>

                    <!-- Follow button -->
                    <v-row>
                        <v-btn color="primary" variant="tonal" @click="followUser">
                        Follow
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-banner>
</template>

<style scoped>
.user-banner {
  margin-top: 16px;
  border-radius: 16px;
  padding: 8px 16px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-banner .v-avatar img {
  border-radius: 50%;
  object-fit: cover;
}

.user-banner .v-btn {
  margin-top: 8px;
}

.font-weight-bold {
  font-size: 16px;
  line-height: 20px;
}

.grey--text {
  font-size: 14px;
  color: #657786;
}
</style>
