import { mount } from '@vue/test-utils'
import guildFactory from '~/data/factories/GuildFactory.js'

import GuildCard from '~/components/GuildCard.vue'
import MissingGuildLogo from '~/components/ui/MissingGuildLogo.vue'
import GuildRecruitment from '~/components/GuildRecruitment.vue'

const makeComponent = (props) => {
  const baseGuild = guildFactory()
  return mount(GuildCard, {
    propsData: {
      ...baseGuild,
      ...props
    }
  })
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

  // it('should display ClassIcons for all the recruited classes', () => {
  //   const wrapper = makeComponent({ recruitment: ['paladin', 'rogue', 'shaman'] })
  //   const wrappers = wrapper.findAllComponents(ClassIcon).wrappers

  //   expect(wrappers[0].props().wowClass).toEqual('paladin')
  //   expect(wrappers[1].props().wowClass).toEqual('rogue')
  //   expect(wrappers[2].props().wowClass).toEqual('shaman')
  // })

  // it('should have a readable link to the website', () => {
  //   const wrapper1 = makeComponent({ websiteUrl: 'https://www.astral.gg/' })
  //   expect(wrapper1.findAll('a').wrappers[0].text()).toEqual('www.astral.gg')

  //   const wrapper2 = makeComponent({ websiteUrl: 'https://astral.gg/' })
  //   expect(wrapper2.findAll('a').wrappers[0].text()).toEqual('astral.gg')

  //   const wrapper3 = makeComponent({ websiteUrl: 'https://astral.gg/some-path' })
  //   expect(wrapper3.findAll('a').wrappers[0].text()).toEqual('astral.gg')
  // })

  // it('should have a contact link', () => {
  //   const wrapper = makeComponent()
  //   expect(wrapper.findAll('a').wrappers[1].text()).toEqual('Contact')
  // })

  // it('should only display the contact link if website URL is the same', () => {
  //   const url = 'https://astral.gg'
  //   const wrapper = makeComponent({ websiteUrl: url, contactUrl: url })
  //   const wrappers = wrapper.findAll('a').wrappers

  //   expect(wrappers.length).toEqual(1)
  //   expect(wrappers[0].text()).toEqual('Contact')
  // })
})
