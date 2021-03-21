import { firestoreAction } from 'vuexfire'

import guildConverter from '~/converters/guildConverter.js'

export const state = () => ({
  list: []
})

export const actions = {
  enableSync: firestoreAction(function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      // .where('published', '==', true)

    return bindFirestoreRef('list', ref, { wait: true })
  }),
  disableSync: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('list', false)
  })
}

export const getters = {
  currentFactionGuilds (state, getters, rootState) {
    return state.list.filter(guild => guild.published && guild.faction === rootState.faction)
  },
  draftGuilds (state) {
    return state.list.filter(guild => guild.published === false)
  },
  publishedGuilds (state) {
    return state.list.filter(guild => guild.published)
  }
}
