export const SortingType = {
  ALPHABETICAL: 'alphabetical',
  CHRONOLOGICAL: 'chronological'
}

export const state = () => ({
  sorting: SortingType.ALPHABETICAL
})

export const mutations = {
  setSorting (state, sorting) {
    state.sorting = sorting
  }
}
