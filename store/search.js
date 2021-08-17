export const SortingType = {
  ALPHABETICAL: 'alphabetical',
  CHRONOLOGICAL: 'chronological'
}

export const state = () => ({
  sorting: SortingType.CHRONOLOGICAL,
  textQuery: ''
})

export const mutations = {
  setSorting (state, sorting) {
    state.sorting = sorting
  },
  setTextQuery (state, textQuery) {
    state.textQuery = textQuery
  }
}
