<script>
import { mapState } from 'vuex'
import leftSidebarComponent from '@/components/left-sidebar-component.vue'
import userToFollowComponent from '@/components/user-to-follow-component.vue'
import feedComponent from '@/components/feed-component.vue'

export default {
  name: 'home-view',
  data () {
    return {
    }
  },
  components: {
    leftSidebarComponent,
    userToFollowComponent,
    feedComponent
  },
  computed: {
    ...mapState('account', ['user']),
    ...mapState('users', ['users'])
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
        <feedComponent />
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
