<script>

export default {
  name: 'user-banner-component',
  methods: {
    followUser () {
      // Handle follow action
      console.log(`Followed ${this.user.name}`)
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
    <v-banner lines="two" class="user-banner">
        <template v-slot:prepend>
            <v-avatar size="56">
                <img :src="user.profilePicture" alt="User Avatar" />
            </v-avatar>
        </template>

        <div class="user-info">
            <v-row no-gutters>
                <v-col>
                  <span class="font-weight-bold">{{ user.name }}</span>
                  <br />
                  <span class="grey--text">@{{ user.handle }}</span>
                </v-col>

                <v-col class="align-end">
                  <v-btn color="primary" variant="tonal" class="follow-btn" @click="followUser">
                    Follow
                  </v-btn>
                </v-col>
            </v-row>
        </div>
    </v-banner>
</template>

<style scoped>
/* .user-banner {
  margin-top: 16px;
  border-radius: 16px;
  padding: 8px 16px;
} */

.user-banner {
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(29, 161, 242, 0.1);
}

/* .user-info {
  display: flex;
  flex-direction: column;
} */

.user-info {
  margin-left: 10px;
}

/* .user-banner .v-avatar img {
  border-radius: 50%;
  object-fit: cover;
}
 */

/* .user-banner .v-btn {
  margin-top: 8px;
} */

.follow-btn {
  margin-top: 10px;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 20px;
}

/* .font-weight-bold {
  font-size: 16px;
  line-height: 20px;
} */

.font-weight-bold {
  font-weight: bold;
  font-size: 1rem;
}

/* .grey--text {
  font-size: 14px;
  color: #657786;
} */

.grey--text {
  color: grey;
}

.align-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

</style>
