import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HomeSearchBar from '~/components/Home/SearchBar.vue'
import * as searchStore from '~/store/search'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    search: {
      state: searchStore.state,
      mutations: searchStore.mutations,
      namespaced: true
    }
  }
})

const mountComponent = () => {
  return mount(HomeSearchBar, {
    localVue,
    store
  })
}

describe('HomeSearchBar', () => {
  it('updates the search store text query', async () => {
    const wrapper = mountComponent()
    await wrapper.find('input').setValue('This is my text query')
    expect(store.state.search.textQuery).toBe('This is my text query')
  })
})
