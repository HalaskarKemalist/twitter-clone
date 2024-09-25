<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterView',
  mounted () {
    console.log('Store:', this.$store) // Should log Vuex store object
  },
  data () {
    return {
      handle: null,
      email: null,
      password: null,
      confirmPassword: null,
      loading: false,
      handleRules: [
        v => !!v || 'Your username is required.',
        v => v.length >= 2 || 'Username should have a minimum length of 2 characters.',
        v => v.length <= 64 || 'Username should have a maximum length of 64 characters.'
      ],
      emailRules: [
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      ],
      passwordRules: [
        v => !!v || 'Password is required.',
        v => v.length >= 8 || 'Password should have a minimum length of 8 characters.',
        v => /[a-zA-Z]/.test(v) || 'Password should include at least one letter.',
        v => /\d/.test(v) || 'Password should include at least one digit.',
        v => /[\W_]/.test(v) || 'Password should include at least one symbol.',
        v => /^\S+$/.test(v) || 'Password should not include spaces.'
      ],
      confirmPasswordRules: [
        v => v === this.password || 'Passwords do not match.'
      ],
      backendError: null
    }
  },
  methods: {
    ...mapActions('account', ['registerUser']),
    async register () {
      // Check if the form exists
      if (!this.$refs.form) {
        console.error('Form ref is not available.')
        return
      }

      const isValid = this.$refs.form.validate() // Validate the entire form

      if (!isValid) {
        console.log('Form is invalid.')
        return // If the form is invalid, stop the submission
      }
      console.log('Valid form')
      console.log(this.$store)
      try {
        console.log('Sending data:', {
          handle: this.handle,
          email: this.email,
          password: this.password
        })

        await this.registerUser({
          handle: this.handle,
          email: this.email,
          password: this.password
        })

        this.$router.push('/setup-profile')
      } catch (e) {
        console.error('Error during registration', e)

        this.backendError = e.response && e.response.data && e.response.data.message
          ? e.response.data.message
          : 'An error occurred. Please try again.'
      }
    }
  }
}
</script>

<template>
  <v-container fluid class="no-scrollbar register-container d-flex align-center justify-center" style="height: 100vh;">
    <v-row
      align="center"
      justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-5 glass-card">
          <v-card-title class="text-center title font-weight-bold">
            <h2>Register</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="register" fast-fail>
              <v-text-field
              v-model="handle"
              class="form-item"
              :rules="handleRules"
              label="Username"
              required
              dense
              variant="outlined"
              color="black"
              prepend-inner-icon="mdi-account"></v-text-field>
              <v-text-field
              v-model="email"
              class="form-item"
              :rules="emailRules"
              label="Email"
              required
              dense
              variant="outlined"
              color="black"
              prepend-inner-icon="mdi-email"
              type="email"></v-text-field>
              <v-text-field
              v-model="password"
              class="form-item"
              :rules="passwordRules"
              label="Password"
              required
              dense
              variant="outlined"
              color="black"
              prepend-inner-icon="mdi-lock"
              type="password"></v-text-field>
              <v-text-field
              v-model="confirmPassword"
              class="form-item"
              :rules="confirmPasswordRules"
              label="Confirm Password"
              required
              dense
              variant="outlined"
              color="black"
              prepend-inner-icon="mdi-lock-check"
              type="password"></v-text-field>
              <v-btn
              class="gradient-btn"
              type="submit"
              color="primary"
              block
              >
                Register
              </v-btn>
              <v-alert
                v-if="backendError"
                rounded
                variant="text"
                type="error"
                class="mt-2"
              >
                {{ backendError }}
              </v-alert>
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
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.register-container {
  /* background-color: #121212;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
  color: white; Optional: To ensure text is visible */
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gradient-btn {
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;
}

.no-scrollbar {
  overflow: hidden;
}

.form-item {
  padding-bottom: 3%;
}
</style>
