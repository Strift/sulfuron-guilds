import { computed, useStore } from '@nuxtjs/composition-api'
import useFirestore from '../useFirestore'

export default function useGuilds () {
  const firestore = useFirestore()
  const store = useStore()

  const create = async (guild) => {
    await firestore.collection('guilds').add(guild)
  }

  const fetch = () => {
    store.dispatch('admin/fetchGuilds')
  }

  const list = computed(() => {
    return store.getters['admin/allGuilds']
  })

  return {
    create,
    list,
    fetch
  }
}
