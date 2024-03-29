import { mount } from '@vue/test-utils'
import faker from 'faker'

import BaseCheckListItem from '~/components/Base/CheckListItem.vue'

const makeComponent = (props, defaultSlot = 'label') => {
  const propsData = {
    id: faker.lorem.word(),
    name: faker.lorem.words(2),
    checked: faker.datatype.boolean(),
    ...props
  }
  return mount(
    BaseCheckListItem, {
      propsData,
      slots: {
        default: defaultSlot
      }
    }
  )
}

describe('BaseCheckListItem', () => {
  it('should have an id', () => {
    const wrapper = makeComponent({ id: 'checkbox-id' })
    expect(wrapper.find('input[type=checkbox]').attributes('id')).toBe('checkbox-id')
  })

  it('should have a name', () => {
    const wrapper = makeComponent({ name: 'checkbox-name' })
    expect(wrapper.find('label').attributes('for')).toBe('checkbox-name')
    expect(wrapper.find('input[type=checkbox]').attributes('name')).toBe('checkbox-name')
  })

  it('should display the label', () => {
    const component = {
      name: 'fake-component',
      template: '<p>component</p>'
    }
    const wrapper = makeComponent({}, [component, 'My Checkbox Label'])
    expect(wrapper.find('label').findComponent(component).exists()).toBe(true)
    expect(wrapper.find('label').text()).toContain('My Checkbox Label')
  })

  it('can be checked by default', () => {
    const wrapper = makeComponent({ checked: true })
    expect(wrapper.find('input[type=checkbox]').element.checked).toBe(true)
  })

  it('can be unchecked by default', () => {
    const wrapper = makeComponent({ checked: false })
    expect(wrapper.find('input[type=checkbox]').element.checked).toBe(false)
  })

  it('should emit a change event when the input changes', async () => {
    const wrapper = makeComponent()
    const input = wrapper.find('input[type=checkbox]')
    const checked = input.element.checked

    await input.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0]).toStrictEqual([checked])
  })
})
