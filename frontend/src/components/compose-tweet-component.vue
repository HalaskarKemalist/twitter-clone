<script>
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'

const emojiIndex = new EmojiIndex(data)

export default {
  name: 'ComposeTweet',
  components: {
    Picker
  },
  data () {
    return {
      tweetContent: '',
      mediaFiles: [],
      selectedGif: null,
      loading: false,
      gifPickerOpen: false,
      emojiIndex: emojiIndex,
      emojiPickerOpen: false,
      gifSearchQuery: '',
      gifResults: []
    }
  },
  computed: {
    ...mapState('account', ['user'])
  },
  methods: {
    ...mapActions('tweets', ['submitTweet']),

    async postTweet () {
      if (!this.tweetContent.trim()) return

      this.loading = true

      const formData = new FormData()
      formData.append('content', this.tweetContent)
      this.mediaFiles.forEach((file, index) => {
        formData.append(`mediaFiles[${index}]`, file)
      })

      if (this.selectedGif) {
        formData.append('gif', this.selectedGif)
      }

      try {
        await this.submitTweet(formData)

        // Intentional delay of 1 second to make loading visible
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.clearTweet()
        this.$emit('tweetPosted') // Notify parent component
      } catch (error) {
        console.error('Error posting tweet:', error)
      } finally {
        this.loading = false
      }
    },

    clearTweet () {
      this.tweetContent = ''
      this.mediaFiles = []
      this.selectedGif = null
    },

    getMediaUrl (file) {
      return URL.createObjectURL(file)
    },

    isImage (file) {
      return file.type.startsWith('image/') && !file.type.includes('gif')
    },

    isVideo (file) {
      return file.type.startsWith('video/')
    },

    openGifPicker () {
      console.log('GIF Picker Opened')
      this.gifPickerOpen = true
    },

    async searchGifs () {
      if (!this.gifSearchQuery.trim()) return

      try {
        console.log('Searching for GIFs:', this.gifSearchQuery)
        const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
          params: {
            api_key: 'QNuODcUUk7UMGLwVF6kJIGCYRKCE8gDf',
            q: this.gifSearchQuery,
            limit: 6
          },
          withCredentials: false
        })
        console.log('GIF Results:', response.data.data)
        this.gifResults = response.data.data
      } catch (error) {
        console.error('Error fetching GIFs:', error)
      }
    },

    selectGif (gifUrl) {
      this.selectedGif = gifUrl
      this.gifPickerOpen = false
    },

    addEmoji (emoji) {
      this.tweetContent = this.tweetContent + emoji.native
    },

    // addEmoji (emoji) {
    //   this.tweetContent += emoji.native
    //   this.emojiPickerOpen = false
    // },

    // addEmoji (emoji) {
    //   console.log('Selected emoji:', emoji) // Debugging log
    //   if (typeof emoji === 'object' && emoji.native) {
    //     this.tweetContent += emoji.native // Ensure it's a string
    //   } else {
    //     console.error('Unexpected emoji format:', emoji)
    //   }
    //   this.emojiPickerOpen = false
    // },

    // addEmoji (emoji) {
    //   console.log('Emoji Selected:', emoji)
    //   console.log('Emoji Type:', typeof emoji)

    //   if (typeof emoji === 'string') {
    //     console.log('Adding emoji:', emoji)
    //     this.tweetContent += emoji
    //     // eslint-disable-next-line
    //   } else if (typeof emoji === 'object' && emoji.hasOwnProperty('native')) {
    //     console.log('Adding emoji:', emoji.native)
    //     this.tweetContent = String(this.tweetContent) + emoji.native
    //   } else {
    //     console.error('Unexpected emoji format:', emoji)
    //   }

    //   this.emojiPickerOpen = false
    // },

    openEmojiPicker () {
      this.emojiPickerOpen = !this.emojiPickerOpen
    }
  }
}
</script>

<template>
  <v-card class="ma-0 pa-5 border-thin">
    <v-row>
      <v-col cols="2">
        <v-avatar size="64">
          <img v-if="user.profilePicture" :src="user.profilePicture" alt="User Avatar" />
          <v-icon v-else>mdi-account-circle</v-icon>
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
          outlined
        ></v-textarea>

        <v-dialog v-model="gifPickerOpen" max-width="500px">
          <v-card>
            <v-card-title>Select a GIF</v-card-title>
            <v-container>
              <v-text-field
                v-model="gifSearchQuery"
                label="Search GIFs"
                append-icon="mdi-magnify"
                @keyup.enter="searchGifs"
              ></v-text-field>

              <v-row>
                <v-col v-for="gif in gifResults" :key="gif.id" cols="4">
                  <v-img
                    :src="gif.images.fixed_height.url"
                    class="gif-item"
                    @click="selectGif(gif.images.fixed_height.url)"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>

        <div v-if="mediaFiles.length || selectedGif" class="media-preview">
          <template v-for="(file, index) in mediaFiles">

            <v-img
              v-if="isImage(file)"
              :key="'img-' + index"
              :src="getMediaUrl(file)"
              class="media-item"
              contain
            ></v-img>

            <video
              v-else-if="isVideo(file)"
              :key="'video-' + index"
              :src="getMediaUrl(file)"
              class="video-item"
              controls
              playsinline
            ></video>
          </template>

          <v-img
            v-if="selectedGif"
            :src="selectedGif"
            class="media-item gif-item"
            contain
          ></v-img>
        </div>

        <v-row class="mt-2 media-buttons" align="center">
          <v-file-input
            v-model="mediaFiles"
            label="Attach media"
            prepend-inner-icon="mdi-camera"
            accept="image/*, video/*"
            multiple
            show-size
            hide-input
            variant="plain"
            class="file-input"
            outlined
            dense
            hide-details
          ></v-file-input>

          <v-btn icon class="gif-button" @click="openGifPicker">
            <v-icon>mdi-gif</v-icon>
          </v-btn>

          <v-btn icon class="emoji-button" @click="openEmojiPicker">
            <v-icon>mdi-emoticon-happy-outline</v-icon>
          </v-btn>

        </v-row>

        <v-dialog v-model="emojiPickerOpen" max-width="350px">
          <v-card>
            <Picker :data="emojiIndex" set="twitter" @select="addEmoji" />
          </v-card>
        </v-dialog>

        <v-row justify="end" class="mt-3">
          <v-btn color="error" variant="text" @click="clearTweet">Cancel</v-btn>
          <v-btn color="primary" :disabled="!tweetContent.trim()" :loading="loading" @click="postTweet">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
              width="3"
            />
            <span v-else>Tweet</span>
          </v-btn>
        </v-row>

      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

.media-preview {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.file-input {
  max-width: 40px; /* Shrinks the input to only show the icon */
}

.emoji-button, .gif-button {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6); /* Same as attach icon */
}

.emoji-button:hover .gif-button:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Light hover effect */
}

.emoji-picker {
  position: absolute;
  z-index: 10;
  bottom: 60px; /* Adjust this if needed */
  left: 10px;
}

.video-item {
  display: block;
  background: black;
  object-fit: cover;
  border-radius: 8px;
  max-width: 500px;
  max-height: 500px;
  width: 80%;
  height: auto;
}

.gif-item {
  border-radius: 8px;
  object-fit: cover;
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  height: auto;
}

.media-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

</style>
