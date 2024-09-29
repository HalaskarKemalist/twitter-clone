<script>
export default {
  name: 'left-sidebar-component',
  props: ['user']
}
</script>

<template>
    <v-list>
      <v-list-item to="/" class="sidebar-item" prepend-icon="mdi-home-outline" link title="Home"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-magnify" link title="Explore"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-bell-outline" link title="Notifications"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-email-outline" link title="Messages"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-slash-forward-box" link title="Grok"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-bookmark-outline" link title="Bookmarks"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-account-multiple-outline" link title="Communities"></v-list-item>
      <v-list-item disabled class="sidebar-item" prepend-icon="mdi-file-excel-box" link title="Premium"></v-list-item>
      <v-list-item class="sidebar-item" prepend-icon="mdi-account-outline" link title="Profile"></v-list-item>
      <v-list-item class="sidebar-item" prepend-icon="mdi-dots-horizontal-circle-outline" link title="More"></v-list-item>
      <v-fade-transition mode="out-in">
        <v-btn class="sidebar-tweet-btn" variant="tonal" color="primary">Tweet</v-btn>
      </v-fade-transition>

      <v-banner lines="two" class="user-banner" color="primary">
        <template v-slot:prepend>
          <v-avatar size="56" icon="mdi-account-filter">
            <img :src="user.profilePicture" alt="User Avatar" />
          </v-avatar>
        </template>
      </v-banner>
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

.user-banner {
  margin-top: 30px;
  padding: 15px;
  background-color: rgba(29, 161, 242, 0.1);
  border-radius: 30px;
  text-align: center;
}

.user-banner img {
  border-radius: 50%;
}

</style>
