<template>
    <div class="notification-container">
        <NotificationBar v-for="n in notifications" :key="n.id" :notification="n"></NotificationBar>
    </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'
export default {
  name: 'NotificationContainer',
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications'])
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
