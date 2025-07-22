<template>
  <div class="register-view">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-4">
            <v-card-title class="text-center">
              <h2>Register</h2>
            </v-card-title>

            <v-card-text>
              <p class="text-center mb-4">This will be implemented in future tasks.</p>

              <v-form>
                <v-text-field label="First Name" disabled placeholder="Coming soon..." />
                <v-text-field label="Last Name" disabled placeholder="Coming soon..." />
                <v-text-field label="Email" type="email" disabled placeholder="Coming soon..." />
                <v-text-field
                  label="Password"
                  type="password"
                  disabled
                  placeholder="Coming soon..."
                />
                <v-text-field
                  label="Confirm Password"
                  type="password"
                  disabled
                  placeholder="Coming soon..."
                />
                <v-btn color="primary" block disabled class="mt-4"> Register (Coming Soon) </v-btn>
              </v-form>

              <div class="text-center mt-4">
                <router-link to="/login">Already have an account? Login</router-link>
              </div>
            </v-card-text>
          </v-card>

          <div class="text-center mt-4">
            <v-btn color="primary" variant="outlined" @click="$router.push('/')">
              Back to Portfolio
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// Register view placeholder - will be implemented in later tasks
</script>

<style scoped>
.register-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #ffe066;
}
</style>
