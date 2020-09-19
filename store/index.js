export const state = () => ({
  faction: 'Horde'
})

export const mutations = {
  toggleFaction (state) {
    if (state.faction === 'Alliance') {
      state.faction = 'Horde'
    } else if (state.faction === 'Horde') {
      state.faction = 'Alliance'
    }
  }
}

export const getters = {
  isAlliance (state) {
    return state.faction === 'Alliance'
  },
  isHorde (state) {
    return state.faction === 'Horde'
  }
}
