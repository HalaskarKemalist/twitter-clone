<script>
import { shallowRef } from 'vue'

export default {

  name: 'user-banner-component',
  data () {
    return {
      isSubscriber: shallowRef(false)
    }
  },
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
    <v-banner lines="two" class="user-banner border-thin ma-0">
        <template v-slot:prepend>
            <v-avatar size="56" class="avatar">
                <img :src="user.profilePicture" alt="User Avatar" />
            </v-avatar>
        </template>

        <div class="user-info">
            <v-row>
                <v-col>
                  <span class="font-weight-bold">{{ user.name }}</span>
                  <br />
                  <span class="handle">@{{ user.handle }}</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="align-end">
                  <v-fade-transition mode="out-in">
                    <v-btn
                    :key="`subscribe-${isSubscriber}`"
                    :variant="isSubscriber ? 'plain' : 'tonal'"
                    class="follow-btn"
                    :text="isSubscriber ? 'Unfollow' : 'Follow'"
                    :slim="isSubscriber"
                    :color="isSubscriber ? 'error' : 'primary'"
                    :border="`thin ${isSubscriber ? 'error' : 'success'}`"
                    @click="followUser; isSubscriber = !isSubscriber">
                    </v-btn>
                  </v-fade-transition>
                </v-col>
            </v-row>
        </div>
    </v-banner>
</template>

<style scoped>

.user-banner {
  padding: 10px;
  border-radius: 12px;
  background-color: #f5f8fa;
}

.follow-btn {
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 20px;
  padding: 5px 15px;
  text-transform: capitalize;
}

.font-weight-bold {
  font-weight: bold;
  font-size: 1rem;
}

.handle {
  color: grey;
  font-size: 0.9rem;
}

.align-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

</style>
