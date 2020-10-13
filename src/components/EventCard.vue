<template>
  <router-link class="event-link" :to="{ name: 'event-show', params: { id: event.id } }">
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <BaseIcon name="users">{{ event.attendees.length }} attending</BaseIcon>
      <div class="delete-button" @click.prevent="clicked">X</div>
    </div>
  </router-link>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    event: Object
  },
  methods: {
    ...mapActions({
      showConfirm: 'confirm/showConfirm',
      hideConfirm: 'confirm/hideConfirm',
      deleteEvent: 'event/deleteEvent',
      fetchEvents: 'event/fetchEvents'
    }),
    clicked() {
      this.showConfirm({
        show: true,
        title: `Are you sure to delete "${this.event.title}"?`,
        acceptAction: () => {
          this.deleteEvent(this.event.id).finally(() => {
            this.hideConfirm()
            this.fetchEvents({ page: parseInt(this.$route.query.page) || 1 })
          })
        },
        cancelAction: () => {
          this.hideConfirm()
        }
      })
    }
  }
}
</script>

<style scoped>
.event-card {
  position: relative;
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
.delete-button {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
