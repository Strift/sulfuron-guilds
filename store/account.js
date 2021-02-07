import { firestoreAction } from 'vuexfire'

export const AUTH_STATE_GUEST = 'guest'
export const AUTH_STATE_LOADING = 'loading'
export const AUTH_STATE_AUTHENTICATED = 'authenticated'
export const AUTH_STATE_ERROR = 'error'

export const state = () => ({
  // AuthState is finite state machine
  authState: AUTH_STATE_GUEST,
  loading: false,
  error: null,
  user: null,
  guild: null
})

export const mutations = {
  startAuthLoading (state) {
    state.authState = AUTH_STATE_LOADING
  },
  setAuthState (state, authState) {
    state.authState = authState
  },
  setError (state, error) {
    state.error = error
  },
  setUser (state, user) {
    state.user = user
  },
  onFirebaseAuthStateChanged (state, { authUser }) {
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
  async login ({ commit, state }, authToken) {
    try {
      if (state.authState !== AUTH_STATE_LOADING) {
        commit('setAuthState', AUTH_STATE_LOADING)
      }

      const { user } = await this.$fire.auth.signInWithCustomToken(authToken)
      commit('setUser', {
        name: user.uid
      })
      commit('setAuthState', AUTH_STATE_AUTHENTICATED)
    } catch (error) {
      commit('setError', error)
      commit('setAuthState', AUTH_STATE_ERROR)
    }
  },
  logout ({ commit }) {
    try {
      this.$fire.auth.signOut()
      commit('setAuthState', AUTH_STATE_GUEST)
      // user state update is managed by onFirebaseAuthStateChanged
    } catch (error) {
      commit('setError', error)
      commit('setAuthState', AUTH_STATE_ERROR)
    }
  },
  enableGuildSync: firestoreAction(function ({ bindFirestoreRef }, documentRef) {
    return bindFirestoreRef('guild', documentRef, { wait: true, reset: false })
  }),
  disableGuildSync: firestoreAction(function ({ unbindFirestoreRef }) {
    return unbindFirestoreRef('guild', false)
  }),
  updateGuild: firestoreAction(async function (ctx, payload) {
    const query = await this.$fire.firestore
      .collection('guilds')
      .where('ownerUid', '==', this.$fire.auth.currentUser.uid)
      .get()
    query.docs[0].ref.set(payload, { merge: true })
  })
}

export const getters = {
  isGuest (state) {
    return state.authState === AUTH_STATE_GUEST
  },
  isAuthenticated (state) {
    return state.authState === AUTH_STATE_AUTHENTICATED
  },
  username (state) {
    return state.user?.name
  },
  ownsGuild (state) {
    return state.guild !== null
  },
  ownsUnpublishedGuild (state) {
    return state.guild && state.guild.published === false
  }
}
