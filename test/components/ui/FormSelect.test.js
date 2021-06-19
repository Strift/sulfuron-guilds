import { expect } from '@jest/globals'
import { mount } from '@vue/test-utils'

import FormSelect from '~/components/ui/FormSelect.vue'

const mountComponent = (props) => {
  const propsData = {
    label: 'default label',
    name: 'default name',
    options: [],
    ...props
  }
  return mount(
    FormSelect, {
      propsData,
      attachTo: document.body
    }
  )
}

const options = [{ label: 'First', value: '1' }, { label: 'Second', value: '2' }]

describe('FormSelect', () => {
  it('has a label', () => {
    const wrapper = mountComponent({ label: 'my little label', name: 'my-select-field' })
    expect(wrapper.find('label').text()).toBe('my little label')
    expect(wrapper.find('label').attributes('for')).toBe('my-select-field')
    expect(wrapper.find('select').attributes('id')).toBe('my-select-field')
  })

  it('lists all options passed as props', () => {
    const wrapper = mountComponent({ options })
    const optionsWrapper = wrapper.findAll('option')
    expect(optionsWrapper.length).toBe(options.length)
    for (let i = 0; i < optionsWrapper.length; i++) {
      expect(optionsWrapper.at(i).attributes('value')).toBe(options[i].value)
      expect(optionsWrapper.at(i).text()).toBe(options[i].label)
    }
  })

  it('can have a placeholder', () => {
    const wrapper = mountComponent({ options, placeholder: 'placeholder text ' })
    const optionsWrapper = wrapper.findAll('option')
    expect(optionsWrapper.length).toBe(options.length + 1)
    expect(optionsWrapper.at(0).text()).toBe('placeholder text')
  })

  it('only shows the placeholder if there is no value', () => {
    const wrapper = mountComponent({ options, placeholder: 'placeholder text ', value: '1' })
    const optionsWrapper = wrapper.findAll('option')
    expect(optionsWrapper.length).toBe(options.length)
    expect(optionsWrapper.at(0).text()).not.toBe('placeholder text')
  })
})
