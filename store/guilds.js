import { firestoreAction } from 'vuexfire'

// Vuex mutations setup in root store

const SYNC_STATE_DISABLED = 'disabled'
const SYNC_STATE_ENABLED = 'enabled'

export const state = () => ({
  syncState: SYNC_STATE_DISABLED,
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
  add: firestoreAction(function (ctx, guild) {
    const ref = this.$fire.firestore.collection('guilds').doc()
    return ref.set(guild)
  })
}
