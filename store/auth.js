export const state = () => ({
  error: null,
  user: null,
  guild: null
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
  },
  setGuild (state, guild) {
    state.guild = guild
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
  },
  async fetchGuild ({ commit }) {
    try {
      const querySnapshot = await this.$fire.firestore.collection('guilds')
        .where('ownerUID', '==', this.$fire.auth.currentUser.uid)
        .get()
      querySnapshot.forEach(doc => commit('setGuild', doc.data()))
    } catch (error) {
      commit('setError', error)
    }
  }
}

export const getters = {
  isLoggedIn (state) {
    return state.user !== null
  },
  ownsUnpublishedGuild (state) {
    return state.guild && state.guild.published === false
  }
}
