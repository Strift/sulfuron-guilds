import { useStore } from '@nuxtjs/composition-api'

export default function useGuildModal () {
  const store = useStore()
  const openGuild = (guild) => {
    store.commit('setOpenGuild', guild)
  }

  return {
    openGuild
  }
}
