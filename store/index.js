import { vuexfireMutations } from 'vuexfire'

export const state = () => ({
  faction: 'Horde',
  notifications: []
})

export const mutations = {
  ...vuexfireMutations,

  toggleFaction (state) {
    if (state.faction === 'Alliance') {
      state.faction = 'Horde'
    } else if (state.faction === 'Horde') {
      state.faction = 'Alliance'
    }
  },

  addNotification (state, { type, message }) {
    state.notifications.push({
      type,
      message,
      timestamp: Date.UTC()
    })
  },

  removeNotificationByTimestamp (state, timestamp) {
    state.notifications = state.notifications.filter(notification => notification.timestamp === timestamp)
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
