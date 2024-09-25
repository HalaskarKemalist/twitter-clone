<!-- <script>
import { mapActions } from 'vuex'

export default {
  name: 'SetupProfileView',
  data () {
    return {
      loading: false,
      step: 1,
      name: '',
      profilePicture: '',
      bio: '',
      location: '',
      website: ''
    }
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Set up your profile'
        case 2: return 'Adjust your display name'
        case 3: return 'Pick up your profile picture'
        case 4: return 'Describe yourself'
        case 5: return 'Where do you live?'
        case 6: return 'Your website'
        default: return 'Click to save updates'
      }
    },
    currentStepField () {
      switch (this.step) {
        case 2: return 'name'
        case 3: return 'profilePicture'
        case 4: return 'bio'
        case 5: return 'location'
        case 6: return 'website'
        default: return ''
      }
    }
  },
  methods: {
    ...mapActions('account', ['updateProfile']),
    async submitProfile () {
      this.loading = true

      try {
        const profile = {
          name: this.form.name,
          profilePicture: this.form.profilePicture,
          bio: this.form.bio,
          location: this.form.location,
          website: this.form.website
        }

        await this.updateProfile(profile) // Dispatch the Vuex action
        this.$router.push('/login') // Redirect to login page on success
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    handleMedia (files) {
      const file = files[0] // Ensure you grab the first file if multiple are selected
      if (file) {
        // Convert to a URL or Base64 string
        const reader = new FileReader()
        reader.onload = (e) => {
          this.form.profilePicture = e.target.result // base64 string for profilePicture
        }
        reader.readAsDataURL(file)
      }
    },
    saveAndNext () {
      this.step++
    },
    back () {
      if (this.step > 1) {
        this.step--
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
            <h2>{{ this.currentTitle }}</h2>
          </v-card-title>

          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <span class="text-caption text-grey-darken-1">
                  Set up your profile to get started
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-form ref="form" fast-fail>
                  <v-text-field
                  v-model="form.name"
                  label="Display Name"
                  dense
                  variant="outlined"
                  color="black"
                  ></v-text-field>
                </v-form>
                <span class="text-caption text-grey-darken-1">
                  This will be your display name, visible to others in your profile and on your posts
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <v-card-text class="text-center">
                <v-form ref="form">
                  <div class="d-flex justify-center align-center">
                    <div class="profile-picture-upload">
                      <v-file-input
                      prepend-icon="mdi-camera"
                      accept="image/*"
                      label="Profile Picture"
                      @change="handleMedia"
                      hide-input
                      ></v-file-input>
                    </div>
                  </div>
                </v-form>
                <span class="text-caption text-grey-darken-1">
                  Choose a profile picture to represent you
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="4">
              <v-card-text>
                <v-form ref="form" fast-fail>
                  <v-text-area
                  v-model="form.bio"
                  label="Bio"
                  dense
                  variant="filled"
                  auto-grow
                  color="black"
                  ></v-text-area>
                </v-form>
                <span class="text-caption text-grey-darken-1">
                  Tell us a bit about yourself. This will appear on your profile and help others get to know you
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="5">
              <v-card-text>
                <v-form ref="form" fast-fail>
                  <v-text-field
                  v-model="form.location"
                  label="Location"
                  dense
                  variant="outlined"
                  color="black"
                  ></v-text-field>
                </v-form>
                <span class="text-caption text-grey-darken-1">
                  TBD
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="6">
              <v-card-text>
                <v-form ref="form" fast-fail>
                  <v-text-field
                  v-model="form.website"
                  label="Website"
                  dense
                  variant="outlined"
                  color="black"
                  ></v-text-field>
                </v-form>
                <span class="text-caption text-grey-darken-1">
                  TBD
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="7">
              <v-card-text>
                <v-btn color="primary" class="v-btn--contained" @click="submitProfile" style="background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;">
                  Save and Finish
                </v-btn>
                <span class="text-caption text-grey-darken-1">
                  TBD
                </span>
              </v-card-text>
            </v-window-item>

          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
            v-if="step > 1"
            color="primary"
            class="v-btn--contained"
            style="background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;"
            @click="back">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            v-if="step < 7"
            color="primary"
            class="v-btn--contained"
            style="background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;"
            @click="saveAndNext">
              Next
            </v-btn>
          </v-card-actions>
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
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-scrollbar {
  overflow: hidden;
}

.v-btn--contained {
        color: white !important;
}

.profile-picture-upload {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #009cff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* .profile-picture-upload v-icon {
  color: white !important;
  position: absolute;
  z-index: 1;
} */

.profile-picture-upload input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

</style>
 -->

 <template>
  <v-container fluid class="no-scrollbar register-container d-flex align-center justify-center" style="height: 100vh;">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-5 glass-card">
          <v-card-title class="text-center title font-weight-bold">
            Set Up Your Profile
          </v-card-title>

          <v-card-text>
            <v-form ref="setupForm" @submit.prevent="submitProfile">
              <!-- Display Name Input -->
              <v-text-field
                v-model="form.displayName"
                label="Display Name"
              />

              <!-- Profile Picture Upload -->
              <v-file-input
                v-model="form.profilePicture"
                label="Upload Profile Picture"
                @change="handleMedia"
                accept="image/*"
                prepend-icon="mdi-camera"
                hide-input
                class="hover:bg-white hover:bg-opacity-25 focus:outline-none transition duration-100"
              />
              <v-avatar size="65" class="my-4" align="center" justify="center">
                <v-img
                  v-if="form.previewPicture"
                  :src="form.previewPicture"
                  max-width="300"
                  max-height="100"
                ></v-img>
              </v-avatar>

              <!-- Other Inputs (Bio, Location, etc.) -->
              <v-textarea
                v-model="form.bio"
                label="Bio"
                rows="3"
                placeholder="Tell us about yourself"
              />
              <v-text-field
                v-model="form.location"
                label="Location"
                placeholder="Your location"
              />
              <v-text-field
                v-model="form.website"
                label="Website"
              />

              <!-- Submit Button -->
              <v-btn
                :loading="loading"
                class="v-btn--contained"
                type="submit"
                color="primary"
                block
              >
                Save Profile
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      file: null,
      form: {
        displayName: null,
        profilePicture: null,
        previewPicture: null, // For showing preview of uploaded image
        bio: null,
        location: null,
        website: null
      }
    }
  },
  methods: {
    handleMedia (event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.form.previewPicture = e.target.result // Show preview
          this.form.profilePicture = e.target.result // Store base64 string for submission
        }
        reader.readAsDataURL(file) // Convert the file to base64
      }
    },
    async submitProfile () {
      this.loading = true
      try {
        // Create profile object to send to backend
        const profile = {
          displayName: this.form.displayName,
          profilePicture: this.form.profilePicture,
          bio: this.form.bio,
          location: this.form.location,
          website: this.form.website
        }

        // Example action call to Vuex
        await this.$store.dispatch('profile/updateProfile', profile)

        // Redirect or notify user of success
        this.$router.push('/home') // Or wherever you want
      } catch (error) {
        console.error('Failed to update profile', error)
        // Handle error (display error messages)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

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
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-scrollbar {
  overflow: hidden;
}

.v-btn--contained {
        color: white !important;
}

.profile-picture-upload {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #009cff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* .profile-picture-upload v-icon {
  color: white !important;
  position: absolute;
  z-index: 1;
} */

.profile-picture-upload input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

</style>
