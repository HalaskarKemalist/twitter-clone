<script>
export default {
  name: 'TweetActions',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    handleMedia (files) {
      console.log('Media selected: ', files)
    }
  }
}
</script>

<template>
  <h1>Tweet Actions</h1>
  <v-row class="tweet-actions">
    <v-col>
      <v-file-input
      prepend-icon="mdi-image"
      accept="image/*,video/*"
      label="Add Media"
      @change="handleMedia"
      hide-input
      dense></v-file-input>
    </v-col>

    <v-col>
      <v-btn icon>
        <v-icon>mdi-emoticon-outline</v-icon>
      </v-btn>
    </v-col>

    <v-col>
      <v-dialog max-width="400px">
        <template>
          <v-btn
          prepend-icon="mdi-calendar"
          ></v-btn>
        </template>

        <v-card prepend-icon="mdi-calendar">
          <v-card-title>
            <span class="headline">Schedule Tweet</span>
          </v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col
              cols="12"
              md="4"
              sm="6">
                <v-date-picker color="primary"></v-date-picker>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col>
      <v-dialog>
        <v-date-picker></v-date-picker>
      </v-dialog>
    </v-col>
    <template>
      <v-dialog></v-dialog>
    </template>
  </v-row>
</template>

<style scoped>
.tweet-actions {
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
