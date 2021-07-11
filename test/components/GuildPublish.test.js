import { mount } from '@vue/test-utils'

import GuildPublish from '~/components/GuildPublish.vue'

describe('GuildPublish', () => {
  it('explains how to publish', () => {
    const wrapper = mount(GuildPublish)
    expect(wrapper.text()).toContain('N\'oubliez pas de cliquer sur publier une fois les informations de votre guilde renseignées.')
  })

  it('emits a publish event on button click', async () => {
    const wrapper = mount(GuildPublish)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('publish')).toBeTruthy()
  })
})
