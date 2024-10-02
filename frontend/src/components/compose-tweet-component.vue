<template>
  <v-card class="ma-0 pa-5 border-thin">
    <v-row>
      <v-col cols="2">
        <v-avatar size="64">
          <img :src="user.profilePicture" alt="User Avatar" />
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-textarea
          v-model="tweetContent"
          placeholder="What's happening?!"
          rows="3"
          auto-grow
          clearable
          variant="underlined"
          counter="280"
          hint="Tweet your thoughts"
          flat
          base-color="blue"
          outlined></v-textarea>
          <v-row justify="end" class="mt-3">
            <v-btn color="primary" @click="Tweet">
              Tweet
            </v-btn>
          </v-row>
      </v-col>
    </v-row>
  </v-card>
  <!-- <v-card class="pa-3 mb-4">
    <v-row>
      <v-col cols="10">

        <v-textarea
          v-model="tweetContent"
          placeholder="What's happening?"
          rows="3"
          auto-grow
          clearable
          outlined
        ></v-textarea>

        <v-file-input
          v-model="mediaFiles"
          prepend-icon="mdi-camera"
          label="Add Media"
          accept="image/*,video/*"
          multiple
          show-size
          outlined
        ></v-file-input>

        <div v-if="mediaFiles && mediaFiles.length" class="d-flex flex-wrap mt-2">
          <v-img
            v-for="(file, index) in mediaFiles"
            :key="index"
            :src="URL.createObjectURL(file)"
            class="mr-2 mb-2"
            max-height="100"
            max-width="100"
            contain
          ></v-img>
        </div>

        <v-row justify="space-between" class="mt-3">
          <v-btn @click="clearTweet" text color="error">
            Cancel
          </v-btn>
          <v-btn @click="submitTweet" color="primary">
            Tweet
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card> -->
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComposeTweet',
  data () {
    return {
      tweetContent: ''
    }
  },
  computed: {
    ...mapState('account', ['user'])
    // ...mapActions('tweets', ['submitTweet'])
    // ...mapState('tweets', ['tweetContent', 'mediaFiles'])
  },
  methods: {
    ...mapActions('tweets', ['submitTweet', 'test']),
    async Tweet () {
      const tweetData = {
        userHandle: this.user.handle,
        content: this.tweetContent
      }
      console.log(tweetData)
      await this.submitTweet(tweetData)
      this.tweetContent = ''
      // this.submitTweet(tweetData).then(() => {
      //   this.tweetContent = ''
      //    this.$emit('tweetPosted')
      // })
    }
  }
  /* data () {
    return {
      tweetContent: '', // Holds the tweet content
      mediaFiles: [] // Holds the attached media files
    }
  },
  methods: {
    // Clears the tweet input and media files
    clearTweet () {
      this.tweetContent = ''
      this.mediaFiles = []
    },
    // Submit the tweet content and media to the backend
    async submitTweet () {
      const formData = new FormData()
      formData.append('content', this.tweetContent)
      this.mediaFiles.forEach((file, index) => {
        formData.append(`mediaFiles[${index}]`, file)
      })

      // Post tweet to the backend using Axios or Vuex action
      try {
        await this.$store.dispatch('tweets/composeTweet', formData)
        this.clearTweet() // Clear form after successful submission
        this.$emit('tweetPosted') // Emit event to parent on successful post
      } catch (error) {
        console.error('Error posting tweet:', error)
      }
    }
  } */
}
</script>
