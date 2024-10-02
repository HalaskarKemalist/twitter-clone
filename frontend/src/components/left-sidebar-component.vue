<script>
import ComposeTweetComponent from './compose-tweet-component.vue'
import userBannerComponent from './user-banner-component.vue'

export default {
  name: 'left-sidebar-component',
  props: ['user'],
  components: {
    ComposeTweetComponent,
    userBannerComponent
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<template>
    <v-list>
      <v-list-item to="/home" class="sidebar-item" prepend-icon="mdi-home-outline" link title="Home"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-magnify" link title="Explore"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-bell-outline" link title="Notifications"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-email-outline" link title="Messages"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-slash-forward-box" link title="Grok"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-bookmark-outline" link title="Bookmarks"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-account-multiple-outline" link title="Communities"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-file-excel-box" link title="Premium"></v-list-item>
      <v-list-item :to="`/${user.handle}`" class="sidebar-item" prepend-icon="mdi-account-outline" link title="Profile"></v-list-item>
      <v-list-item class="sidebar-item" prepend-icon="mdi-dots-horizontal-circle-outline" link title="More"></v-list-item>
        <v-btn class="sidebar-tweet-btn" @click="dialog = true" color="primary">
            <div class="text-none font-weight-regular">Tweet</div>
        </v-btn>

        <v-dialog v-model="dialog" max-width="600">
            <v-card class="pa-0 border-0">
              <v-btn class="pa-1 ma-2" size="25" icon @click="dialog = false">
                  <v-icon size="15" justify-center align-center>mdi-close</v-icon>
              </v-btn>
              <v-card-text>
                <ComposeTweetComponent class="ml-7 mr-7 mb-7" />
              </v-card-text>
                <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">Close</v-btn>
                </v-card-actions> -->
            </v-card>
        </v-dialog>
        <userBannerComponent :user="user" />
      <!-- <v-banner lines="two" class="user-banner" color="primary">
        <template v-slot:prepend>
          <v-avatar size="56" icon="mdi-account-filter">
            <img :src="user.profilePicture" alt="User Avatar" />
          </v-avatar>
        </template>
      </v-banner> -->
    </v-list>
</template>

<style scoped>
.sidebar-list {
  padding: 10px;
}

.sidebar-item {
  padding: 10px 15px;
  border-radius: 30px;
  transition: background-color 0.3s ease;
  font-weight: bold;
  color: #1da1f2;
}

.sidebar-item:hover {
  background-color: rgba(29, 161, 242, 0.1);
}

.sidebar-tweet-btn {
  margin-bottom: 20px;
  width: 80%;
  height: 50px;
  border-radius: 30px;
}

.user-banner img {
  border-radius: 50%;
}

</style>
