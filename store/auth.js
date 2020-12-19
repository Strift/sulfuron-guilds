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
  autoLogin ({ commit }) {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        commit('setUser', {
          name: user.uid
        })
      } else {
        commit('setUser', null)
      }
    })
  }
}
