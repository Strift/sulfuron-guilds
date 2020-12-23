export const state = () => ({
  error: null,
  user: null
})

export const mutations = {
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
  }
}

export const actions = {
  async login ({ commit }, token) {
    try {
      if (this.$fire.auth.currentUser) {
        return
      }
      const { user } = await this.$fire.auth.signInWithCustomToken(token)
      commit('setUser', {
        name: user.uid
      })
    } catch (error) {
      commit('setError', error)
    }
  },
  async logout ({ commit }) {
    try {
      await this.$fire.auth.signOut()
      // state update is handled by onAuthStateChanged
    } catch (error) {
      commit('setError', error)
    }
  }
}

export const getters = {
  isLoggedIn (state) {
    return state.user !== null
  }
}
