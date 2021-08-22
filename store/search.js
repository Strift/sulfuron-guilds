export const SortingType = {
  ALPHABETICAL: 'alphabetical',
  CHRONOLOGICAL: 'chronological'
}

export const state = () => ({
  sorting: SortingType.CHRONOLOGICAL,
  textQuery: '',
  removeOutdatedGuilds: true
})

export const mutations = {
  setSorting (state, sorting) {
    state.sorting = sorting
    if (sorting === SortingType.CHRONOLOGICAL) {
      state.removeOutdatedGuilds = true
    }
  },
  setTextQuery (state, textQuery) {
    state.textQuery = textQuery
  },
  setRemoveOutdatedGuilds (state, removeOutdatedGuilds) {
    state.removeOutdatedGuilds = removeOutdatedGuilds
    if (removeOutdatedGuilds === false) {
      state.sorting = SortingType.ALPHABETICAL
    }
  }
}
