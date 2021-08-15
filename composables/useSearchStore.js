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

  const results = computed(() => store.getters['guilds/searchResults'])

  const orderedResults = computed(() => {
    if (sorting.value === SortingType.ALPHABETICAL) {
      return sortBy(results.value, [guild => guild.name.toLowerCase()])
    }
    return orderBy(results.value, [guild => guild.updatedAt], ['desc'])
  })

  return {
    sorting,
    setSorting,
    orderedResults
  }
}
