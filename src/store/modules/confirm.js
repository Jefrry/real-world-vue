export const namespaced = true

export const state = {
  show: false,
  title: '',
  acceptAction: () => {},
  cancelAction: () => {}
}

export const mutations = {
  SHOW(state, c) {
    state.title = c.title
    state.acceptAction = c.acceptAction
    state.cancelAction = c.cancelAction
    state.show = true
  },
  HIDE(state) {
    state.show = false
    state.title = ''
    state.acceptAction = () => {}
    state.cancelAction = () => {}
  }
}

export const actions = {
  showConfirm({ commit }, c) {
    commit('SHOW', c)
  },
  hideConfirm({ commit }) {
    commit('HIDE')
  }
}
