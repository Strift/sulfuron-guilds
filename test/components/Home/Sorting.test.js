import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { state, mutations, SortingType } from '~/store/search'
import HomeSorting from '~/components/Home/Sorting.vue'
import BaseSecondaryButton from '~/components/Base/SecondaryButton.vue'

const localVue = createLocalVue()
// TODO: replace with real nuxt components registration logic
localVue.component('BaseSecondaryButton', BaseSecondaryButton)
localVue.use(Vuex)

let store

const mountComponent = () => {
  store = new Vuex.Store({
    modules: {
      search: {
        state,
        mutations,
        namespaced: true
      }
    }
  })

  return mount(HomeSorting, {
    localVue,
    store
  })
}

describe('HomeSorting', () => {
  it('defaults to alphabetical order', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('select').element.value).toBe(SortingType.ALPHABETICAL)
  })

  it('updates the search store sorting', async () => {
    const wrapper = mountComponent()
    const select = wrapper.find('select')

    expect(store.state.search.sorting).toBe(SortingType.ALPHABETICAL)

    await select.setValue(SortingType.CHRONOLOGICAL)
    expect(store.state.search.sorting).toBe(SortingType.CHRONOLOGICAL)

    await select.setValue(SortingType.ALPHABETICAL)
    expect(store.state.search.sorting).toBe(SortingType.ALPHABETICAL)
  })
})
