import { firestoreAction } from 'vuexfire'

// Vuex mutations setup in root store

export const state = () => ({
  list: []
})

export const actions = {
  enableSync: firestoreAction(function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('guilds')
    return bindFirestoreRef('list', ref, { wait: true })
  }),
  disableSync: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('list', false)
  }),
  add: firestoreAction(function ({ bindFirestoreRef }, guild) {
    const ref = this.$fire.firestore.collection('guilds').doc()
    return ref.set(guild)
  })
}
