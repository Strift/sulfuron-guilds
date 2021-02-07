import { firestoreAction } from 'vuexfire'

const AUTH_STATE_GUEST = 'guest'
const AUTH_STATE_LOADING = 'loading'
const AUTH_STATE_AUTHENTICATED = 'authenticated'
const AUTH_STATE_ERROR = 'error'

export const state = () => ({
  // AuthState is finite state machine
  authState: AUTH_STATE_GUEST,
  user: null,
  guild: null,
  error: null
})

export const mutations = {
  onFirebaseAuthStateChanged (state, { authUser }) {
    if (authUser) {
      state.user = {
        name: authUser.uid
      }
    } else {
      state.user = null
    }
  },
  startAuthLoading (state) {
    state.authState = AUTH_STATE_LOADING
  },
  setAuthState (state, authState) {
    state.authState = authState
  },
  setUser (state, user) {
    state.user = user
  },
  setOwnerState (state, ownerState) {
    state.ownerState = ownerState
  },
  setError (state, error) {
    state.error = error
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
  async fetchGuild ({ commit, dispatch }) {
    const querySnapshot = await this.$fire.firestore
      .collection('guilds')
      .where('ownerUid', '==', this.$fire.auth.currentUser.uid)
      .get()

    if (querySnapshot.empty) {
      commit('setGuild', null)
      return
    }
    await dispatch('enableGuildSync', querySnapshot.docs[0].ref) // There should be only one query result
  },
  enableGuildSync: firestoreAction(function ({ bindFirestoreRef }, documentRef) {
    return bindFirestoreRef('guild', documentRef, { reset: true })
  }),
  // Action to be called when leaving the account layout
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
    return state.user !== null
  },
  username (state) {
    return state.user?.name
  },
  isAGuildOwner (state) {
    return state.guild !== null
  },
  ownsUnpublishedGuild (state) {
    return state.guild && state.guild.published === false
  }
}
