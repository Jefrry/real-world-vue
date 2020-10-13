export const namespaced = true

export const state = {
  notifications: []
}
let nextId = 1

export const mutations = {
  PUSH(state, n) {
    state.notifications.push({
      ...n,
      id: nextId++
    })
  },
  DELETE(state, notificationToDelete) {
    state.notifications = state.notifications.filter(
      n => n.id !== notificationToDelete.id
    )
  }
}

export const actions = {
  add({ commit }, n) {
    commit('PUSH', n)
  },
  delete({ commit }, n) {
    commit('DELETE', n)
  }
}
