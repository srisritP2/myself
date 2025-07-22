<template>
  <div class="not-found-view">
    <v-container>
      <v-row justify="center" align="center" style="min-height: 100vh">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <v-icon size="120" color="primary" class="mb-4"> mdi-emoticon-sad-outline </v-icon>

          <h1 class="display-1 mb-4">404 - Page Not Found</h1>

          <p class="text-h6 mb-6">Oops! The page you're looking for doesn't exist.</p>

          <v-btn color="primary" size="large" @click="$router.push('/')">
            <v-icon left>mdi-home</v-icon>
            Go Home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// 404 Not Found page
</script>

<style scoped>
.not-found-view {
  background: #ffe066;
  min-height: 100vh;
}
</style>
