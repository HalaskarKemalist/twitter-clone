<template>
  <v-app style="background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);">
    <v-navigation-drawer v-if="showLayout" class="navigation" location="left" elevation="3" app>
      <v-list-item height="50" prepend-icon="mdi-home-outline" link title="Home"></v-list-item>
      <v-list-item disabled height="50" prepend-icon="mdi-magnify" link title="Explore"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-bell-outline" link title="Notifications"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-email-outline" link title="Messages"></v-list-item>
      <v-list-item disabled height="50" prepend-icon="mdi-slash-forward-box" link title="Grok"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-bookmark-outline" link title="Bookmarks"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-account-multiple-outline" link title="Communities"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-file-excel-box" link title="Premium"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-flash-outline" link title="Verified Orgs"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-account-outline" link title="Profile"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-dots-horizontal-circle-outline" link title="More"></v-list-item>
      <v-fade-transition mode="out-in">
        <v-btn border="thin" variant="tonal" color="primary">Tweet</v-btn>
      </v-fade-transition>

      <v-banner
        color="primary">
        <template v-slot:prepend>
          <v-avatar
            color="deep-purple-accent-4"
            icon="mdi-account-filter"
          ></v-avatar>
        </template>
      </v-banner>
    </v-navigation-drawer>

    <v-main no-gutters permanent app>
      <RouterView style="background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);"/>
    </v-main>

    <!-- <v-navigation-drawer v-if="showLayout" class="navigation" location="right" elevation="3" app>
      <v-list-item height="50" prepend-icon="mdi-home-outline" link title="Home Right"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-magnify" link title="Explore"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-bell-outline" link title="Notifications"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-email-outline" link title="Messages"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-slash-forward-box" link title="Grok"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-bookmark-outline" link title="Bookmarks"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-account-multiple-outline" link title="Communities"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-file-excel-box" link title="Premium"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-flash-outline" link title="Verified Orgs"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-account-outline" link title="Profile"></v-list-item>
      <v-list-item height="50" prepend-icon="mdi-dots-horizontal-circle-outline" link title="More"></v-list-item>
      <v-fade-transition mode="out-in">
        <v-btn border="thin" variant="tonal" color="primary">Tweet</v-btn>
      </v-fade-transition>
    </v-navigation-drawer> -->

    <!-- <v-footer>
      <a href="">Terms of Service</a>
      <a href="">Privacy Policy</a>
      <a href="">Cookie Policy</a>
      <a href="">Imprint</a>
      <a href="">Accessibility</a>
      <a href="">Ads info</a>
      <a href="">More</a>
      <a href="">2024 X Corp.</a>
    </v-footer> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
    }
  },
  computed: {
    showLayout () {
      return this.$route.meta.layout !== 'auth'
    }
  }
}
</script>

<style>
.navigation {
  margin: 0;
  width:"280";
}
</style>
