import { vuexfireMutations } from 'vuexfire'
import cookie from 'cookie'
import Factions from '~/data/factions'

const BACKGROUND_STATE_FACTION = 'faction'
const BACKGROUND_STATE_PROMO = 'sunwell'

export const state = () => ({
  faction: Factions.HORDE,
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
    if (state.faction === Factions.ALLIANCE) {
      state.faction = Factions.HORDE
    } else if (state.faction === Factions.HORDE) {
      state.faction = Factions.ALLIANCE
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

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req) {
      const cookies = cookie.parse(req.headers.cookie)
      if (cookies.default_faction &&
        [Factions.HORDE, Factions.ALLIANCE].includes(cookies.default_faction)
      ) {
        commit('setFaction', cookies.default_faction)
      }
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
