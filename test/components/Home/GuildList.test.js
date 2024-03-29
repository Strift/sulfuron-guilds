import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import sortBy from 'lodash/sortBy'
import orderBy from 'lodash/orderBy'
import guildFactory from '~/data/factories/guildFactory'
import * as rootStore from '~/store'
import * as guildsStore from '~/store/guilds'
import * as searchStore from '~/store/search'
import GuildsList from '~/components/Home/GuildsList.vue'
import GuildsListItem from '~/components/Home/GuildsListItem.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.directive('lazy-load', {})
localVue.component('HomeGuildsListItem', GuildsListItem)

const guildsFaction = 'Horde'

const guilds = [...Array(10)].map((_, index) => ({
  id: index.toString(),
  ...guildFactory({ faction: guildsFaction })
}))
const alphabeticallySortedGuilds = sortBy(guilds, [guild => guild.name.toLowerCase()])
const chronologicallySortedGuilds = orderBy(guilds, [guild => guild.updatedAt], ['desc'])

let store

const mountComponent = ({ defaultSorting } = {}) => {
  store = new Vuex.Store({
    state: rootStore.state,
    mutations: rootStore.mutations,
    getters: rootStore.getters,
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

  store.state.faction = guildsFaction
  store.state.guilds.list = guilds
  if (defaultSorting) {
    store.state.search.sorting = defaultSorting
  }

  return mount(GuildsList, {
    localVue,
    store,
    stubs: {
      NuxtLink: true
    }
  })
}

describe('GuildsList', () => {
  it('can sort guilds alphabetically', () => {
    const wrapper = mountComponent({ defaultSorting: searchStore.SortingType.ALPHABETICAL })
    const listItemsWrappers = wrapper.findAllComponents(GuildsListItem).wrappers

    expect(listItemsWrappers.map(wrapper => wrapper.props().name))
      .toEqual(alphabeticallySortedGuilds.map(({ name }) => name))
  })

  it('can sort guilds by last update date', () => {
    const wrapper = mountComponent({ defaultSorting: searchStore.SortingType.CHRONOLOGICAL })
    const listItemsWrappers = wrapper.findAllComponents(GuildsListItem).wrappers

    expect(listItemsWrappers.map(wrapper => wrapper.props().updatedAt))
      .toEqual(chronologicallySortedGuilds.map(({ updatedAt }) => updatedAt))
  })

  it('defaults to chronological sorting', () => {
    const wrapper = mountComponent()
    const listItemsWrappers = wrapper.findAllComponents(GuildsListItem).wrappers

    expect(listItemsWrappers.map(wrapper => wrapper.props().updatedAt))
      .toEqual(chronologicallySortedGuilds.map(({ updatedAt }) => updatedAt))
  })

  // it('updates the open guild when an item is clicked', async () => {
  //   const wrapper = mountComponent()
  //   const listItemsWrappers = wrapper.findAllComponents(GuildsListItem).wrappers

  //   const randomIndex = Math.floor(Math.random() * listItemsWrappers.length)
  //   await listItemsWrappers[randomIndex].trigger('click')
  //   expect(store.state.openGuild).toEqual(chronologicallySortedGuilds[randomIndex])
  // })
})
