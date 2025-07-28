<template>
  <teleport to="body">
    <div class="notification-container">
      <transition-group name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'notification-toast',
            `notification-${notification.type}`,
            { 'notification-persistent': notification.persistent },
          ]"
        >
          <div class="notification-content">
            <div class="notification-icon">
              <v-icon :color="getIconColor(notification.type)">
                {{ getIcon(notification.type) }}
              </v-icon>
            </div>
            <div class="notification-text">
              <div class="notification-title">{{ notification.title }}</div>
              <div v-if="notification.message" class="notification-message">
                {{ notification.message }}
              </div>
            </div>
            <div class="notification-actions">
              <v-btn
                icon
                size="small"
                variant="text"
                @click="dismissNotification(notification.id)"
                aria-label="Dismiss notification"
              >
                <v-icon size="18">mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <div
            v-if="!notification.persistent && notification.duration > 0"
            class="notification-progress"
            :style="{ animationDuration: `${notification.duration}ms` }"
          ></div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

// Get notifications from store
const notifications = computed(() => uiStore.notifications)

// Dismiss notification
function dismissNotification(id) {
  uiStore.dismissNotification(id)
}

// Get icon based on notification type
function getIcon(type) {
  const icons = {
    success: 'mdi-check-circle',
    error: 'mdi-alert-circle',
    warning: 'mdi-alert',
    info: 'mdi-information',
  }
  return icons[type] || icons.info
}

// Get icon color based on notification type
function getIconColor(type) {
  const colors = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  }
  return colors[type] || colors.info
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
  max-width: 400px;
}

.notification-toast {
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  overflow: hidden;
  pointer-events: auto;
  position: relative;
  border-left: 4px solid;
  max-width: 100%;
  min-width: 300px;
}

.notification-success {
  border-left-color: #4caf50;
}

.notification-error {
  border-left-color: #f44336;
}

.notification-warning {
  border-left-color: #ff9800;
}

.notification-info {
  border-left-color: #2196f3;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
}

.notification-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-text {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  color: #1f2937;
  margin-bottom: 2px;
}

.notification-message {
  font-size: 13px;
  line-height: 1.4;
  color: #6b7280;
}

.notification-actions {
  flex-shrink: 0;
}

.notification-progress {
  height: 3px;
  background: linear-gradient(90deg, currentColor 0%, currentColor 100%);
  animation: progress linear forwards;
  transform-origin: left;
}

.notification-success .notification-progress {
  color: #4caf50;
}

.notification-error .notification-progress {
  color: #f44336;
}

.notification-warning .notification-progress {
  color: #ff9800;
}

.notification-info .notification-progress {
  color: #2196f3;
}

/* Dark theme support */
.v-theme--dark .notification-toast {
  background: #374151;
}

.v-theme--dark .notification-title {
  color: #f9fafb;
}

.v-theme--dark .notification-message {
  color: #d1d5db;
}

/* Animations */
.notification-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.notification-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .notification-enter-active,
  .notification-leave-active,
  .notification-move {
    transition-duration: 0.1s;
  }

  .notification-progress {
    animation-duration: 0.1s !important;
  }
}
</style>
