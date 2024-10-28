import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_PATH || 'http://localhost:3000' // Backend API base URL
axios.defaults.withCredentials = true // Include cookies with requests

loadFonts()

const app = createApp(App)

const errorHandler = (err, instance, info) => {
  console.error(`Error: ${err.toString()}\nInfo: ${info}\nInstance:${instance}`)

  alert(`Error: ${err.toString()}\nInfo: ${info}\nInstance:${instance}`)
}

const warnHandler = (msg, instance, trace) => {
  console.error(`Error: ${msg.toString()}\nTrace: ${trace}\nInstance:${instance}`)

  alert(`Error: ${msg.toString()}\nTrace: ${trace}\nInstance:${instance}`)
}

app.config.errorHandler = errorHandler
app.config.warnHandler = warnHandler
app.config.performance = true

app
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

console.log(store.state)
console.log(store.modules)
