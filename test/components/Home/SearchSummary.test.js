import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import guildFactory from '~/data/factories/guildFactory'
import * as rootStore from '~/store'
import * as guildsStore from '~/store/guilds'
import * as searchStore from '~/store/search'
import SearchSummary from '~/components/Home/SearchSummary.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const guildsFaction = 'Horde'

const allGuilds = [...Array(10)].map((_, index) => ({
  id: index.toString(),
  ...guildFactory({ faction: guildsFaction })
}))

let store

const mountComponent = ({ guilds } = {}) => {
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

  return mount(SearchSummary, {
    localVue,
    store
  })
}

describe('SearchSummary', () => {
  it('displays plural text when they are zero guilds', () => {
    const wrapper = mountComponent({ guilds: [] })
    expect(wrapper.text()).toContain('0 guildes trouvées')
  })

  it('displays singular text when they is one guilds', () => {
    const wrapper = mountComponent({ guilds: [allGuilds[0]] })
    expect(wrapper.text()).toContain('1 guilde trouvée')
  })

  it('displays plural text when they are more than 1 guilds', () => {
    const wrapper = mountComponent({ guilds: allGuilds })
    expect(wrapper.text()).toContain('10 guildes trouvées')
  })
})
