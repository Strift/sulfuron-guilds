import { mount, createLocalVue } from '@vue/test-utils'
import guildFactory from '~/data/factories/guildFactory.js'

import HomeGuildsListItem from '~/components/Home/GuildsListItem.vue'
import MissingGuildLogo from '~/components/ui/MissingGuildLogo.vue'
import GuildRecruitment from '~/components/GuildRecruitment.vue'

const localVue = createLocalVue()
localVue.directive('lazy-load', {})

let componentsCreated = 0
const makeComponent = (props) => {
  const guild = guildFactory(props)
  return mount(HomeGuildsListItem, {
    localVue,
    propsData: {
      id: (++componentsCreated).toString(),
      ...guild
    }
  })
}

describe('GuildsListItem', () => {
  it('shows the guild name', () => {
    const wrapper = makeComponent({ name: 'Astral' })
    expect(wrapper.text()).toContain('Astral')
  })

  it('shows the guild type', () => {
    const wrapper = makeComponent({ type: 'Classique' })
    expect(wrapper.text()).toContain('Classique')
  })

  it('shows the guild logo', () => {
    const wrapper = makeComponent()
    expect(wrapper.find('img').attributes().src).toEqual(wrapper.props().logoUrl)
  })

  it('shows MissingGuildLogo when there is no logo URL', () => {
    const wrapper = makeComponent({ logoUrl: '' })
    expect(wrapper.findComponent(MissingGuildLogo).exists()).toBe(true)
  })

  it('shows MissingGuildLogo when logo is not hosted on https', () => {
    const wrapper = makeComponent({ logoUrl: 'http://placeimg.com/640/480' })
    expect(wrapper.findComponent(MissingGuildLogo).exists()).toBe(true)
  })

  it('shows MissingGuildLogo when logo image emits an error', async () => {
    const wrapper = makeComponent()
    await wrapper.find('img').trigger('error')
    expect(wrapper.findComponent(MissingGuildLogo).exists()).toBe(true)
  })

  it('shows the raid days shortened', () => {
    const wrapper = makeComponent()
    const readableRaidDays = wrapper.props().raidDays
      .filter(({ playing }) => playing)
      .map(({ day }) => day.slice(0, 3)).join(', ')
    expect(wrapper.text()).toContain(readableRaidDays)
  })

  it('shows the time range', () => {
    const wrapper = makeComponent({ startHour: '06:06', endHour: '23:23' })
    expect(wrapper.text()).toContain('06:06 – 23:23')
  })

  it('shows the GuildRecruitment', () => {
    const wrapper = makeComponent()
    expect(wrapper.findComponent(GuildRecruitment).exists()).toBe(true)
  })

  it('shows when it was last updated', () => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const wrapper = makeComponent({ updatedAt: threeDaysAgo })
    expect(wrapper.text()).toContain('Il y a 3 jours')
  })

  it('has a default message for missing update date', () => {
    const wrapper = makeComponent({ updatedAt: undefined })
    expect(wrapper.text()).toContain('Il y a un moment')
  })

  it('emits a click event on click', async () => {
    const wrapper = makeComponent()
    await wrapper.find('button').element.click()
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
