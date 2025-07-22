<template>
  <div class="admin-dashboard">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Admin Dashboard</h1>
          <p>Welcome to the admin panel. This will be implemented in future tasks.</p>

          <v-card class="mt-4">
            <v-card-title>Coming Soon</v-card-title>
            <v-card-text>
              <ul>
                <li>Portfolio request management</li>
                <li>User management</li>
                <li>Analytics dashboard</li>
                <li>Portfolio generation tools</li>
              </ul>
            </v-card-text>
          </v-card>

          <v-btn color="primary" class="mt-4" @click="$router.push('/')"> Back to Portfolio </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// Admin dashboard placeholder - will be implemented in later tasks
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  padding: 2rem;
}
</style>
