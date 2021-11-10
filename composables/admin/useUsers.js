import { ref, useNuxtApp } from '#app'

export const STATE_EMPTY = 'empty'
export const STATE_LOADING = 'loading'
export const STATE_LOADED = 'loaded'
export const STATE_ERROR = 'error'

export default function useUsers () {
  const { $fire } = useNuxtApp()
  const listUsers = $fire.functions.httpsCallable('listUsers')

  const state = ref(STATE_EMPTY)
  const users = ref([])

  const fetchUsers = async () => {
    try {
      state.value = STATE_LOADING
      const { data } = await listUsers()
      users.value = data.users
      state.value = STATE_LOADED
    } catch (error) {
      state.value = STATE_ERROR
    }
  }

  return {
    state,
    users,
    fetchUsers
  }
}
