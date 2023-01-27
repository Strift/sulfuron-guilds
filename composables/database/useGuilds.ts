import useCollection from '~/composables/services/firebase/useCollection'
import guildConverter from '~/data/converters/guildConverter'
import type { Guild } from '~/data/types'

export default function useGuilds () {
  const {
    add,
    findBy,
    list: listDocuments,
    updateBy,
    deleteById: deleteDocument
  } = useCollection<Guild>('guilds', { converter: guildConverter })

  const create = (guild: Guild) => {
    return add(guild)
  }

  const findBySlug = (slug: string) => {
    return findBy('slug', slug)
  }

  const list = ({ published }: { published?: boolean } = {}) => {
    const whereEquals = published === undefined
      ? {}
      : { published }

    return listDocuments({ whereEquals, subCollections: ['redirects'] })
  }

  const updateBySlug = (slug: string, payload: Partial<Guild>) => {
    return updateBy('slug', slug, payload)
  }

  const deleteById = (id: string, { hardDelete = false } = {}) => {
    if (hardDelete) {
      return deleteDocument(id)
    } else {
      return updateBy('id', id, {
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
