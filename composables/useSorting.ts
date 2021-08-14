import { ref } from '@nuxtjs/composition-api'
import Sorting from '~/types/Sorting'

export default function useSorting () {
  const sortingOrder = ref<Sorting>('alphabetical')
  const setSortingOrder = (sorting: Sorting) => {
    sortingOrder.value = sorting
  }

  return {
    sortingOrder,
    setSortingOrder
  }
}
