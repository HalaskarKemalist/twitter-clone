<template>
  <v-app>

    <v-main class="d-flex justify-center pa-0 fill-height" permanent app>
      <v-container fluid class="pa-0 fill-height">
        <router-view class="pa-0" />
      </v-container>
    </v-main>
  </v-app>
</template>

<!-- <template>
  <v-app>
    <v-container fluid>
      <v-row>

        <v-col cols="2" class="left-sidebar">
          <v-list dense>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-twitter</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Explore</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-bell-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Notifications</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-email-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Messages</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-bookmark-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Bookmarks</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>More</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col cols="7" class="main-feed">
          <v-card class="mb-3">
            <v-text-field
              label="What's happening?"
              outlined
              dense
            ></v-text-field>
            <v-btn
              color="primary"
              block
            >
              Tweet
            </v-btn>
          </v-card>

          <v-card class="mb-3">
            <v-card-title>
              <v-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/31.jpg"></v-img>
              </v-avatar>
              <span class="ml-3">John Doe @johndoe • 1h</span>
            </v-card-title>
            <v-card-text>
              This is a sample tweet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </v-card-text>
            <v-card-actions>
              <v-btn icon>
                <v-icon>mdi-message-reply-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card class="mb-3">
            <v-card-title>
              <v-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/25.jpg"></v-img>
              </v-avatar>
              <span class="ml-3">Jane Smith @janesmith • 3h</span>
            </v-card-title>
            <v-card-text>
              Another tweet sample with some text.
            </v-card-text>
            <v-card-actions>
              <v-btn icon>
                <v-icon>mdi-message-reply-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-col>

        <v-col cols="3" class="right-sidebar">
          <v-card class="mb-3">
            <v-card-title>Who to follow</v-card-title>
            <v-divider></v-divider>

            <v-list-item>
              <v-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/76.jpg"></v-img>
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title>Mark Johnson</v-list-item-title>
                <v-list-item-subtitle>@markjohnson</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn outlined>Follow</v-btn>
            </v-list-item>

            <v-list-item>
              <v-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title>Emma Wilson</v-list-item-title>
                <v-list-item-subtitle>@emmawilson</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn outlined>Follow</v-btn>
            </v-list-item>
          </v-card>

          <v-card class="mb-3">
            <v-card-title>Trending</v-card-title>
            <v-divider></v-divider>

            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>#VueJS</v-list-item-title>
                  <v-list-item-subtitle>23k Tweets</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>#Vuetify</v-list-item-title>
                  <v-list-item-subtitle>18k Tweets</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </v-app>
</template> -->

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('account', ['user']),
    showNavigationDrawer () {
      return this.$route.meta.layout !== 'auth'
    }
  }
}
</script>

<style scoped>
.left-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0px 0px 0px 120px;
}

.main-feed {
  padding: 20px;
}

.right-sidebar {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.user-banner {
  margin-top: 16px;
  border-radius: 16px;
  padding: 8px 16px;
}

</style>
