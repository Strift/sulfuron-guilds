import { computed, useStore } from '@nuxtjs/composition-api'
import sortBy from 'lodash/sortBy'
import orderBy from 'lodash/orderBy'
import { SortingType } from '~/store/search'

export default function useSearchStore () {
  const store = useStore()

  const sorting = computed(() => {
    return store.state.search.sorting
  })

  const setSorting = (sorting) => {
    store.commit('search/setSorting', sorting)
  }

  const setTextQuery = (textQuery) => {
    store.commit('search/setTextQuery', textQuery)
  }

  const results = computed(() => store.getters['guilds/searchResults'])

  const orderedResults = computed(() => {
    if (sorting.value === SortingType.ALPHABETICAL) {
      return sortBy(results.value, [guild => guild.name.toLowerCase()])
    }
    return orderBy(results.value, [
      (guild) => {
        if (guild.updatedAt) {
          return guild.updatedAt
        }
        return new Date(2021, 1, 1)
      },
      guild => guild.name.toLowerCase()
    ],
    ['desc'])
  })

  const removeOutdatedGuilds = computed(() => store.state.search.removeOutdatedGuilds)

  const setRemoveOutdatedGuilds = (removeOutdatedGuilds) => {
    store.commit('search/setRemoveOutdatedGuilds', removeOutdatedGuilds)
  }

  return {
    sorting,
    setSorting,
    setTextQuery,
    orderedResults,
    removeOutdatedGuilds,
    setRemoveOutdatedGuilds
  }
}
