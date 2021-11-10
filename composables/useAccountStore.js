import { computed, useNuxtApp } from '#app'

export default function useAccountStore () {
  const { $store: store } = useNuxtApp()

  const isGuest = computed(() => store.getters['account/isGuest'])
  const isAuthenticated = computed(() => store.getters['account/isAuthenticated'])

  return {
    isGuest,
    isAuthenticated
  }
}
