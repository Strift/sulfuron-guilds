import { firestoreAction } from 'vuexfire'

// Vuex mutations setup in root store

export const state = () => ({
  list: []
})

export const actions = {
  enableSync: firestoreAction(function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('guilds')
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
