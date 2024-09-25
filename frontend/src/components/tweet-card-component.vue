<script>

export default {
  name: 'tweet-card-component',
  props: {
    tweet: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <v-card class="text-white tweet-card" color="#000000">
    <template v-slot:prepend>
      <v-icon size="x-large" color="white">mdi-twitter</v-icon>
    </template>

    <v-card-text class="text-h5 py-2">
      {{ tweet.body }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            :image="tweet.author.avatar || 'default-avatar.png'"
          ></v-avatar>
        </template>

        <v-list-item-title>{{ tweet.author.name || 'Unknown User' }}</v-list-item-title>
        <v-list-item-subtitle>@{{ tweet.author.handle || 'unknown' }}</v-list-item-subtitle>

        <template v-slot:append>
          <div class="twitter-actions space-around">
            <v-btn icon><v-icon>mdi-message-reply-outline</v-icon></v-btn>
            <v-btn icon><v-icon>mdi-twitter-retweet</v-icon></v-btn>
            <v-btn icon><v-icon>mdi-heart-outline</v-icon></v-btn>
            <v-btn icon><v-icon>mdi-eye-outline</v-icon></v-btn>
            <v-btn icon><v-icon>mdi-bookmark-outline</v-icon></v-btn>
            <v-btn icon><v-icon>mdi-export-variant</v-icon></v-btn>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.tweet-card {
  margin-bottom: 16px;
}
.twitter-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
