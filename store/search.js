export const SortingType = {
  ALPHABETICAL: 'alphabetical',
  CHRONOLOGICAL: 'chronological'
}

export const state = () => ({
  sorting: SortingType.CHRONOLOGICAL
})

export const mutations = {
  setSorting (state, sorting) {
    state.sorting = sorting
  }
}
