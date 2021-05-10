import { vuexfireMutations } from 'vuexfire'

const BACKGROUND_STATE_FACTION = 'faction'
const BACKGROUND_STATE_PROMO = 'sunwell'

export const state = () => ({
  faction: 'Horde',
  background: BACKGROUND_STATE_FACTION,
  openGuild: null,
  notifications: []
})

export const mutations = {
  ...vuexfireMutations,

  setFactionBackground (state) {
    state.background = BACKGROUND_STATE_FACTION
  },

  setPromoBackground (state) {
    state.background = BACKGROUND_STATE_PROMO
  },

  setFaction (state, faction) {
    state.faction = faction
  },

  toggleFaction (state) {
    if (state.faction === 'Alliance') {
      state.faction = 'Horde'
    } else if (state.faction === 'Horde') {
      state.faction = 'Alliance'
    }
  },

  setOpenGuild (state, guild) {
    state.openGuild = guild
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
