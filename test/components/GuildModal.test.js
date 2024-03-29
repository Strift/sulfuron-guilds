import { createLocalVue, mount } from '@vue/test-utils'
import guildFactory from '~/data/factories/guildFactory.js'
import GuildModal from '~/components/GuildModal.vue'

const baseURL = 'url.com'
const localVue = createLocalVue()
localVue.directive('lazy-load', {})

let componentsCreated = 0
const makeComponent = (props) => {
  const guild = guildFactory(props)
  return mount(GuildModal, {
    propsData: {
      id: (++componentsCreated).toString(),
      ...guild
    },
    mocks: {
      $config: {
        baseURL
      }
    },
    localVue
  })
}

describe('GuildModal', () => {
  it('shows a readable website link', () => {
    const wrapper1 = makeComponent({ websiteUrl: 'https://www.astral.gg/' })
    expect(wrapper1.find('a[title="Site web"]').text()).toEqual('www.astral.gg')

    const wrapper2 = makeComponent({ websiteUrl: 'https://astral.gg/' })
    expect(wrapper2.find('a[title="Site web"]').text()).toEqual('astral.gg')

    const wrapper3 = makeComponent({ websiteUrl: 'https://astral.gg/some-path' })
    expect(wrapper3.find('a[title="Site web"]').text()).toEqual('astral.gg')
  })

  it('show a contact link', () => {
    const wrapper = makeComponent()
    const linkWrapper = wrapper.find('a[title=Contact]')
    expect(linkWrapper.text()).toEqual('Contact')
    expect(linkWrapper.attributes('href')).toEqual(`${baseURL}/redirect/?type=contact&guild=${componentsCreated}`)
  })

  it('only shows the contact link when the website URL is the same', () => {
    const url = 'https://astral.gg'
    const wrapper = makeComponent({ websiteUrl: url, contactUrl: url })
    expect(wrapper.find('a[title="Site web"]').exists()).toBe(false)
  })
})
