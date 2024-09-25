<script>
import composeTweetComponent from '../components/compose-tweet-component.vue'
import tweetListComponent from '../components/tweet-list-component.vue'

export default {
  name: 'feed-component',
  data: () => ({
    tab: '',
    tabs: [
      {
        text: 'For you',
        value: '1'
      },
      {
        text: 'Following',
        value: '2'
      }
    ]
  }),
  components: {
    composeTweetComponent,
    tweetListComponent
  }
}
</script>

<template>
  <!-- <composeTweetComponent />
  <tweetListComponent /> -->
  <v-sheet color="black">
    <v-tabs
      v-model="tab"
      :items="tabs"
      align-tabs="center"
      color="white"
      height="60"
      slider-color="#f78166"
    >
      <template v-slot:tab="{ item }">
        <v-tab
          :text="item.text"
          :value="item.value"
        ></v-tab>
      </template>

      <template v-slot:item="{ item }">
        <v-tabs-window-item :value="item.value" class="pa-4">
          <composeTweetComponent />
          <tweetListComponent />
        </v-tabs-window-item>
      </template>
    </v-tabs>
  </v-sheet>
</template>
