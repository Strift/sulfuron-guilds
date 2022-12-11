import useFirestore from '../services/firebase/useFirestore'
import useCollection from '../services/firebase/useCollection'
import guildConverter from '~/data/converters/guildConverter'
import type { Guild } from '~/data/types'

export default function useGuilds () {
  const { add, findBy, list: listDocuments } = useCollection<Guild>('guilds', { converter: guildConverter })

  const firestore = useFirestore()

  const create = (guild: Guild) => {
    return add(guild)
  }

  const findBySlug = (slug: string) => {
    return findBy('slug', slug)
  }

  const list = ({ published } = { published: undefined }) => {
    console.log('useGuilds: list')
    const whereEquals = published === undefined
      ? {}
      : { published }

    return listDocuments({ whereEquals, subCollections: ['redirects'] })
  }

  const updateBySlug = async (slug, payload) => {
    const guildSnapshot = await firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .where('slug', '==', slug)
      .get()

    if (guildSnapshot.empty) {
      throw new Error('Guild does not exist')
    }

    return guildSnapshot.docs[0].ref.update(payload)
  }

  const deleteById = (id, { hardDelete = false } = {}) => {
    const docRef = firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .doc(id)

    if (hardDelete) {
      return docRef.delete()
    } else {
      return docRef.update({
        ownerUid: null,
        deleted: true
      })
    }
  }

  return {
    create,
    list,
    findBySlug,
    updateBySlug,
    deleteById
  }
}
