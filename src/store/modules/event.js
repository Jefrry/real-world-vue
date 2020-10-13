import EventService from '@/services/EventService'

// для диспача через "модуль/имя_диспача" или через mapActions
// чтобы избежать одинаковых имён диспача
export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  perPage: 3,
  event: {}
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, total) {
    state.eventsTotal = total
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'The event was created'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem creating event ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    EventService.getEvents(state.perPage, page)
      .then(res => {
        commit('SET_EVENTS', res.data)
        commit('SET_EVENTS_TOTAL', res.headers['x-total-count'])
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then(res => {
        commit('SET_EVENT', res.data)
        return res.data
      })
    }
  },
  deleteEvent({ dispatch }, id) {
    return EventService.deleteEvent(id)
      .then(() => {
        const notification = {
          type: 'success',
          message: 'The event was deleted'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem deleting event ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  }
}
export const getters = {
  getEventById: state => id => state.events.find(event => event.id === id)
}
