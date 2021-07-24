import { useStore, computed } from '@nuxtjs/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import useClassFilters from './useClassFilters'

export default function () {
  const store = useStore()
  const { filters, setFilter } = useClassFilters()

  const updateStore = () => store.commit('guilds/setClassFilters', cloneDeep(filters.value))

  const setClassFilter = ({ classValue, specValue }, checked) => {
    setFilter({ classValue, specValue }, checked)
    updateStore()
  }

  const classFilters = computed(() => {
    return store.state.guilds.classFilters
  })

  updateStore()

  return {
    setClassFilter,
    classFilters
  }
}
