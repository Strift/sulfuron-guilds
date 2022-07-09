import SpecIcon from '~/components/atoms/icons/SpecIcon.vue'

export default {
  component: SpecIcon,
  args: {
    specializationSlug: 'rogue-assassination',
    altText: 'Voleur Assassinat'
  },
  title: 'atoms/icons/SpecIcon'
}

const Template = (args, { argTypes }) => ({
  components: { SpecIcon },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<SpecIcon v-bind="$props" />'
})

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  grayscale: true
}
