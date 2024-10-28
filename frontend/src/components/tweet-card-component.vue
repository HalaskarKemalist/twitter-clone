<script>
import { mapActions } from 'vuex'

export default {
  name: 'tweet-card-component',
  props: ['tweet'],
  data: () => ({
    items: [
      { title: 'Edit', action: 'edit' },
      { title: 'Pin to your profile', action: 'pin' }
    ],
    isEditing: false,
    editedTweet: ''
  }),
  computed: {
    isUserTweet () {
      return this.tweet.author.handle === this.$store.state.account.user.handle
    }
  },
  methods: {
    ...mapActions('tweets', ['deleteTweet', 'updateTweet']),

    handleAction (action) {
      if (action === 'delete') {
        this.deleteTweetConfirm()
      } else if (action === 'edit') {
        this.enableEditMode()
      }
    },

    deleteTweetConfirm () {
      if (confirm('Are you sure you want to delete this tweet?')) {
        const userHandle = this.$store.state.account.user.handle
        const tweetId = this.tweet._id

        console.log('User Handle:', userHandle) // Check this value
        console.log('Tweet ID:', tweetId)

        this.deleteTweet({ userHandle, tweetId })
      }
    },

    enableEditMode () {
      this.isEditing = true
      this.editedTweet = this.tweet.body
    },

    async submitEdit () {
      if (this.editedTweet !== this.tweet.body) {
        await this.updateTweet({
          tweetId: this.tweet._id,
          body: this.editedTweet
        })
      }
      this.isEditing = false
    },

    cancelEdit () {
      this.isEditing = false // Discard changes
    }
  }
}
</script>

<template>
  <v-card class="tweet-card border-thin" color="white" elevation="0">

    <v-card-title v-if="!isEditing" class="d-flex align-center px-4 py-2">
      <v-avatar size="40" class="mr-3" :image="tweet.author.profilePicture"></v-avatar>
      <div>
        <div class="author-name">{{ tweet.author.name || 'Unknown User' }}</div>
        <div class="author-handle grey--text">@{{ tweet.author.handle || 'unknown' }}</div>
      </div>

      <v-spacer></v-spacer>
      <div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn size="25" icon v-bind="props">
              <v-icon size="15">mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" @click="handleAction(item.action)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="isUserTweet" @click="handleAction('delete')">
              <v-list-item-title class="delete-button-text">Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-title>

    <v-card-text class="tweet-body px-4 py-1">
      <div v-if="!isEditing">{{ tweet.body }}</div>
      <div v-else>
        <v-textarea
          v-model="editedTweet"
          rows="3"
          hide-details
          auto-grow
          outlined
        ></v-textarea>

        <div class="edit-actions d-flex justify-end mt-2">
          <v-btn @click="cancelEdit" color="grey darken-2" small>Cancel</v-btn>
          <v-btn @click="submitEdit" color="blue darken-2" small>Save</v-btn>
        </div>
      </div>
    </v-card-text>

    <v-card-actions class="px-4 py-2">
      <div class="twitter-actions">
        <v-btn icon color="grey darken-2"><v-icon>mdi-message-reply-outline</v-icon></v-btn>
        <v-btn icon color="grey darken-2"><v-icon>mdi-twitter-retweet</v-icon></v-btn>
        <v-btn icon color="grey darken-2"><v-icon>mdi-heart-outline</v-icon></v-btn>
        <v-btn icon color="grey darken-2"><v-icon>mdi-eye-outline</v-icon></v-btn>
        <v-btn icon color="grey darken-2"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
        <v-btn icon color="grey darken-2"><v-icon>mdi-export-variant</v-icon></v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.tweet-card {
  background-color: white; /* Light background for the card */
  transition: box-shadow 0.2s;
}

.tweet-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Light shadow on hover */
}

.v-avatar {
  background-color: #e0e0e0; /* Light grey fallback color */
}

.author-name {
  font-weight: 600;
  font-size: 16px;
}

.author-handle {
  font-size: 14px;
  color: #757575; /* Grey color for handle text */
}

.tweet-body {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 12px;
  color: #424242; /* Darker text for better contrast on light theme */
}

.twitter-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.twitter-actions .v-btn {
  padding: 8px;
}

.edit-actions {
  margin-top: 10px;
}

.v-card-title {
  padding: 8px;
}

.delete-button-text {
  color: red !important;
}
</style>
