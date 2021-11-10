import { useNuxtApp } from '#app'

export default function useGuildModal () {
  const { $store: store } = useNuxtApp()
  const openGuild = (guild) => {
    store.commit('setOpenGuild', guild)
  }

  return {
    openGuild
  }
}
