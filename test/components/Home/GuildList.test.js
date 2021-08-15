import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import sortBy from 'lodash/sortBy'
import orderBy from 'lodash/orderBy'
import guildFactory from '~/data/factories/guildFactory'
import * as guildsStore from '~/store/guilds'
import * as searchStore from '~/store/search'
import GuildsList from '~/components/Home/GuildsList.vue'
import GuildsListItem from '~/components/Home/GuildsListItem.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.directive('lazy-load', {})
localVue.component('HomeGuildsListItem', GuildsListItem)

const guilds = [...Array(10)].map((_, index) => ({
  id: index.toString(),
  ...guildFactory({ faction: 'Horde' })
}))

let store

const mountComponent = ({ defaultSorting } = {}) => {
  store = new Vuex.Store({
    state: {
      faction: 'Horde'
    },
    modules: {
      guilds: {
        state: guildsStore.state,
        mutations: guildsStore.mutations,
        getters: guildsStore.getters,
        namespaced: true
      },
      search: {
        state: searchStore.state,
        mutations: searchStore.mutations,
        namespaced: true
      }
    }
  })

  store.state.guilds.list = guilds
  if (defaultSorting) {
    store.state.search.sorting = defaultSorting
  }

  return mount(GuildsList, {
    localVue,
    store
  })
}

describe('GuildsList', () => {
  it('sorts guilds alphabetically by default', () => {
    const alphabeticallySortedGuilds = sortBy(guilds, [guild => guild.name.toLowerCase()])
    const wrapper = mountComponent()
    const listItemsWrappers = wrapper.findAllComponents(GuildsListItem).wrappers

    expect(listItemsWrappers.map(wrapper => wrapper.props().name))
      .toEqual(alphabeticallySortedGuilds.map(({ name }) => name))
  })

  it('can sort guilds by last update date', () => {
    const wrapper = mountComponent({ defaultSorting: searchStore.SortingType.CHRONOLOGICAL })
    const chronologicallySortedGuilds = orderBy(guilds, [guild => guild.updatedAt], ['desc'])

    const listItemsWrappers = wrapper.findAllComponents(GuildsListItem).wrappers

    expect(listItemsWrappers.map(wrapper => wrapper.props().updatedAt))
      .toEqual(chronologicallySortedGuilds.map(({ updatedAt }) => updatedAt))
  })
})
