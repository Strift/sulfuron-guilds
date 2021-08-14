import useSorting from '~/composables/useSorting.ts'

describe('useSorting', () => {
  it('defaults to alphabetical sorting order', () => {
    const { sortingOrder } = useSorting()
    expect(sortingOrder.value).toBe('alphabetical')
  })

  it('can be switched to chrological and vice-versa', () => {
    const { sortingOrder, setSortingOrder } = useSorting()
    expect(sortingOrder.value).toBe('alphabetical')
    setSortingOrder('chronological')
    expect(sortingOrder.value).toBe('chronological')
    setSortingOrder('alphabetical')
    expect(sortingOrder.value).toBe('alphabetical')
  })
})
