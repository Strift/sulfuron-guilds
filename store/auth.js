import firebase from 'firebase/app'
import 'firebase/auth'

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
  }
}

export const actions = {
  async login ({ commit }, token) {
    try {
      if (firebase.auth().currentUser) {
        return
      }
      const { user } = await firebase.auth().signInWithCustomToken(token)
      commit('setUser', {
        name: user.uid
      })
    } catch (error) {
      commit('setError', error)
    }
  },
  autoLogin ({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
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
