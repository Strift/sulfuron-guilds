import { firestoreAction } from 'vuexfire'

export const state = () => ({
  loading: false,
  error: null,
  user: null,
  guild: null
})

export const getters = {
  username (state) {
    return state.user?.name
  },
  isLoggedIn (state) {
    return state.user !== null
  },
  ownsUnpublishedGuild (state) {
    return state.guild && state.guild.published === false
  }
}

export const mutations = {
  setLoading (state, loading) {
    state.loading = loading
  },
  setError (state, error) {
    state.error = error
  },
  setUser (state, user) {
    state.user = user
  },
  onAuthStateChanged (state, { authUser }) {
    if (authUser) {
      state.user = {
        name: authUser.uid
      }
    } else {
      state.user = null
    }
  },
  setGuild (state, guild) {
    state.guild = guild
  }
}

export const actions = {
  async login ({ commit }, token) {
    try {
      commit('setLoading', true)
      if (this.$fire.auth.currentUser) {
        return
      }
      const { user } = await this.$fire.auth.signInWithCustomToken(token)
      commit('setUser', {
        name: user.uid
      })
    } catch (error) {
      commit('setError', error)
    } finally {
      commit('setLoading', false)
    }
  },
  async logout ({ commit }) {
    try {
      await this.$fire.auth.signOut()
      // state update is handled by onAuthStateChanged
    } catch (error) {
      commit('setError', error)
    }
  },
  enableGuildSync: firestoreAction(async function ({ bindFirestoreRef }) {
    const query = await this.$fire.firestore
      .collection('guilds')
      .where('ownerUid', '==', this.$fire.auth.currentUser.uid)
      .get()
    return bindFirestoreRef('guild', query.docs[0].ref, { wait: true })
  }),
  disableGuildSync: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('guild', false)
  }),
  updateGuild: firestoreAction(async function (ctx, payload) {
    const query = await this.$fire.firestore
      .collection('guilds')
      .where('ownerUid', '==', this.$fire.auth.currentUser.uid)
      .get()
    query.docs[0].ref.set(payload, { merge: true })
  })
}
