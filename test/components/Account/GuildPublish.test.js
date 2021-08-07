import { mount } from '@vue/test-utils'

import AccountGuildPublish from '~/components/Account/GuildPublish.vue'

describe('AccountGuildPublish', () => {
  it('explains how to publish', () => {
    const wrapper = mount(AccountGuildPublish)
    expect(wrapper.text()).toContain('N\'oubliez pas de cliquer sur publier une fois les informations de votre guilde renseignées.')
  })

  it('emits a publish event on button click', async () => {
    const wrapper = mount(AccountGuildPublish)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('publish')).toBeTruthy()
  })
})
