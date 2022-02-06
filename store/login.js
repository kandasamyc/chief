export const state = () => ({
  name: '',
  validity: false,
})

export const mutations = {
  changeName(state, newName) {
    state.name = newName
    state.validity = false
  },
  remove(state) {
    state.name = ''
  },
  changeValidity(state, newValidity) {
    state.validity = newValidity
  },
}
