import { createLocalVue, mount } from '@vue/test-utils'

import AccountGuildPublish from '~/components/Account/GuildPublish.vue'
import BasePrimaryButton from '~/components/Base/PrimaryButton.vue'
import BaseInformationCard from '~/components/atoms/InformationCard.vue'

const localVue = createLocalVue()
// TODO: replace with real nuxt components registration logic
localVue.component('BasePrimaryButton', BasePrimaryButton)
localVue.component('BaseInformationCard', BaseInformationCard)

const mountComponent = () => {
  return mount(AccountGuildPublish, {
    localVue
  })
}

describe('AccountGuildPublish', () => {
  it('explains how to publish', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('N\'oubliez pas de cliquer sur publier une fois les informations de votre guilde renseignées.')
  })

  it('emits a publish event on button click', async () => {
    const wrapper = mountComponent()
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('publish')).toBeTruthy()
  })
})
