<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <nav class="pagination">
      <template v-if="page !== 1">
        <router-link :to="{name: 'event-list', query: { page: page - 1 }}" rel="prev">Prev</router-link>
      </template>
      <template v-if="event.eventsTotal > page * event.perPage">
        <router-link :to="{name: 'event-list', query: { page: page + 1 }}" rel="next">Next</router-link>
      </template>
    </nav>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    EventCard
  },
  computed: {
    ...mapState(['event', 'user']),
    page() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  methods: mapActions('event', ['fetchEvents']),
  created() {
    this.fetchEvents({
      page: this.page
    })
  }
}
</script>
<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>