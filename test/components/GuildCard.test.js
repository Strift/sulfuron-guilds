import { mount } from '@vue/test-utils'
import guildFactory from '~/data/factories/GuildFactory.js'

import GuildCard from '~/components/GuildCard.vue'
import MissingGuildLogo from '~/components/ui/MissingGuildLogo.vue'
import GuildRecruitment from '~/components/GuildRecruitment.vue'

const makeComponent = (props) => {
  const propsData = guildFactory(props)
  return mount(GuildCard, { propsData })
}

describe('GuildCard', () => {
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

  it('shows MissingGuildLogo when logo image is not loading', async () => {
    const wrapper = makeComponent({ logoUrl: 'xszaxq' })
    await wrapper.find('img').trigger('error')
    expect(wrapper.findComponent(MissingGuildLogo).exists()).toBe(true)
  })

  it('shows the raid days shortened', () => {
    const wrapper = makeComponent()
    const readableRaidDays = wrapper.props().raidDays.map(day => day.slice(0, 3)).join(', ')
    expect(wrapper.text()).toContain(readableRaidDays)
  })

  it('shows the time range', () => {
    const wrapper = makeComponent({ timeRange: '06h06 - 23h23' })
    expect(wrapper.text()).toContain('06h06 - 23h23')
  })

  it('shows the GuildRecruitment', () => {
    const wrapper = makeComponent()
    expect(wrapper.findComponent(GuildRecruitment).exists()).toBe(true)
  })

  it('shows when it was last updated', () => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const wrapper = makeComponent({ updatedAt: threeDaysAgo })
    expect(wrapper.text()).toContain('il y a 3 jours')
  })

  it('has a default message for missing update date', () => {
    const wrapper = makeComponent({ updatedAt: undefined })
    expect(wrapper.text()).toContain('il y a un moment')
  })
})
