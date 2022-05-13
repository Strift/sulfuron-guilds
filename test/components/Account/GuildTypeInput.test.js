import { expect, jest } from '@jest/globals'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import AccountGuildTypeInput from '~/components/Account/GuildTypeInput.vue'
import BaseSelect from '~/components/Base/Select.vue'
import guildFactory from '~/data/factories/guildFactory.js'

const types = [
  {
    value: 'Classique',
    label: 'Classique (PvE)'
  },
  {
    value: 'PvP',
    label: 'PvP'
  },
  {
    value: 'Speedrun',
    label: 'Speedrun'
  },
  {
    value: 'Beginners',
    label: 'Débutants'
  },
  {
    value: 'RP',
    label: 'Jeu de rôle'
  }
]

describe('AccountGuildTypeInput', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.component('BaseSelect', BaseSelect) // TODO: update with real Nuxt Components registration logic
  let store
  let guild

  beforeEach(() => {
    guild = guildFactory()
    store = new Vuex.Store({
      modules: {
        account: {
          state: {
            guild
          },
          namespaced: true
        }
      }
    })
    store.dispatch = jest.fn()
  })

  it('lists all options', () => {
    const wrapper = mount(AccountGuildTypeInput, { store, localVue })
    expect(wrapper.findComponent(BaseSelect).props('options')).toEqual(types)
  })

  it('defaults to the store value', () => {
    const wrapper = mount(AccountGuildTypeInput, { store, localVue })
    expect(wrapper.findComponent(BaseSelect).props('value')).toEqual(guild.type)
  })

  it('dispatches a store update on value change', async () => {
    jest.useFakeTimers('modern')
    const wrapper = mount(AccountGuildTypeInput, { store, localVue })
    await wrapper.findComponent(BaseSelect).vm.$emit('input', 'some value')
    jest.advanceTimersByTime(1000)
    expect(store.dispatch).toHaveBeenCalledWith('account/updateGuild', { type: 'some value' })
    jest.useRealTimers()
  })
})
