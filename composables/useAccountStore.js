import { computed, useStore } from '@nuxtjs/composition-api'

export default function useAccountStore () {
  const store = useStore()

  const isGuest = computed(() => store.getters['account/isGuest'])
  const isAuthenticated = computed(() => store.getters['account/isAuthenticated'])

  return {
    isGuest,
    isAuthenticated
  }
}
