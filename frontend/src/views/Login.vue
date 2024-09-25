<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  mounted () {
    console.log('login Store:', this.$store)
  },
  data () {
    return {
      loading: false,
      form: {
        handle: '',
        password: ''
      },
      valid: false,
      showPassword: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ]
    }
  },
  methods: {
    ...mapActions('account', ['login', 'resendVerificationEmail']),
    async componentLogin () {
      console.log('Login method triggered') // Debugging log
      this.$refs.form.validate()
      if (this.$refs.form.$el.checkValidity()) {
        this.loading = true
        try {
          console.log('Dispatching login action')
          await this.login(this.form)
          const handle = this.$store.state.account.user.handle
          this.$router.push(`/${handle}`)
        } catch (error) {
          console.log('Login error: ', error)
        } finally {
          this.loading = false
        }
      }
    }

  }
}
// :type="showPassword ? 'text' : 'password'"
// :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
// @click:append="showPassword = !showPassword"
</script>

<template>
  <v-container fluid class="no-scrollbar register-container d-flex align-center justify-center" style="height: 100vh;">
    <v-row
      align="center"
      justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-5 glass-card">
          <v-card-title class="text-center title font-weight-bold">
            <h2>Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="componentLogin" lazy-validation fast-fail>
              <v-text-field
              v-model="form.handle"
              class="form-item"
              label="Username"
              required
              dense
              variant="outlined"
              color="black"
              prepend-inner-icon="mdi-login"
              :rules="[v => !!v || 'Username is required']"></v-text-field>
              <v-text-field
              v-model="form.password"
              class="form-item"
              label="Password"
              required
              dense
              variant="outlined"
              color="black"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="[v => !!v || 'Password is required', v => v.length >= 3 || 'Password must be at least 3 characters']"></v-text-field>
              <v-btn
              type="submit"
              color="primary"
              block
              style="background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.glass-card {
  /* background: rgba(255, 255, 255, 0.75); */
  background: whitesmoke;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(50px);
  border: 1px solid;
}

.register-container {
  /* background-color: #121212;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
  color: white; Optional: To ensure text is visible */
  background-color: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-item {
  padding-bottom: 3%;
}

.no-scrollbar {
  overflow: hidden;
}
</style>
