import { expect, jest } from '@jest/globals'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GuildTypeInput from '~/components/GuildTypeInput.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import guildFactory from '~/test/factories/GuildFactory.js'

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

jest.useFakeTimers()

describe('GuildTypeInput', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
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
    const wrapper = mount(GuildTypeInput, { store, localVue })
    expect(wrapper.findComponent(FormSelect).props('options')).toEqual(types)
  })

  it('defaults to the store value', () => {
    const wrapper = mount(GuildTypeInput, { store, localVue })
    expect(wrapper.findComponent(FormSelect).props('value')).toEqual(guild.type)
  })

  it('dispatches a store update on value change', async () => {
    const wrapper = mount(GuildTypeInput, { store, localVue })
    await wrapper.findComponent(FormSelect).vm.$emit('input', 'some value')
    jest.advanceTimersByTime(1000)
    expect(store.dispatch).toHaveBeenCalledWith('account/updateGuild', { type: 'some value' })
  })
})
