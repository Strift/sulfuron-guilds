import { computed, useStore } from '@nuxtjs/composition-api'
import useFirestore from '../useFirestore'

export default function useGuilds () {
  const firestore = useFirestore()
  const store = useStore()

  const create = async (guild) => {
    try {
      await firestore.collection('guilds').add(guild)
    } catch (err) {
      // TODO: handle error
    }
  }

  const fetch = () => {
    store.dispatch('admin/fetchGuilds')
  }

  const list = computed(() => store.state.guilds.list)

  return {
    create,
    list,
    fetch
  }
}
