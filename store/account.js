import { firestoreAction } from 'vuexfire'

const AUTH_STATE_GUEST = 'guest'
const AUTH_STATE_LOADING = 'loading'
const AUTH_STATE_AUTHENTICATED = 'authenticated'
const AUTH_STATE_ERROR = 'error'

export const state = () => ({
  // AuthState is finite state machine
  authState: AUTH_STATE_GUEST,
  user: null,
  admin: false,
  guild: null,
  error: null
})

export const mutations = {
  startAuthLoading (state) {
    state.authState = AUTH_STATE_LOADING
  },
  setAuthState (state, authState) {
    state.authState = authState
  },
  setUser (state, user) {
    state.user = user
  },
  setAdmin (state, admin) {
    state.admin = admin
  },
  setError (state, error) {
    state.error = error
  }
}

export const actions = {
  onFirebaseAuthStateChanged ({ commit, dispatch }, { authUser }) {
    if (authUser) {
      commit('setUser', {
        name: authUser.uid
      })
      commit('setAuthState', AUTH_STATE_AUTHENTICATED)
      dispatch('fetchAdmin')
      dispatch('fetchGuild')
    } else {
      commit('setUser', null)
      commit('setAuthState', AUTH_STATE_GUEST)
    }
  },
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
  logout ({ commit, dispatch }) {
    try {
      this.$fire.auth.signOut()
      commit('setAuthState', AUTH_STATE_GUEST)
      commit('setAdmin', false)
      dispatch('disableGuildSync')
      // user state update is managed by onFirebaseAuthStateChanged
    } catch (error) {
      commit('setError', error)
      commit('setAuthState', AUTH_STATE_ERROR)
    }
  },
  async fetchAdmin ({ commit }) {
    const userRef = await this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.uid)
      .get()

    if (userRef.exists) {
      commit('setAdmin', userRef.data().admin)
    }
  },
  async fetchGuild ({ commit, dispatch }) {
    const querySnapshot = await this.$fire.firestore
      .collection('guilds')
      .where('ownerUid', '==', this.$fire.auth.currentUser.uid)
      .get()

    if (querySnapshot.empty) {
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
  hasDraftGuild (state) {
    return state.guild?.published === false
  },
  isAdmin (state) {
    return state.admin
  }
}
