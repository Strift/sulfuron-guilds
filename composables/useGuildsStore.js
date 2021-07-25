import { useStore, computed } from '@nuxtjs/composition-api'

export default function () {
  const store = useStore()

  const classFilters = computed(() => store.state.guilds.classFilters)

  const activeClassFilters = computed(() => {
    return store.getters['guilds/classFilters']
  })

  const setClassFilter = ({ classValue, specValue }, checked) => {
    store.commit('guilds/setClassFilter', { classValue, specValue, enabled: checked })
  }

  const resetClassFilters = () => {
    store.commit('guilds/setAllClassFilters', false)
  }

  return {
    classFilters,
    activeClassFilters,
    setClassFilter,
    resetClassFilters
  }
}
