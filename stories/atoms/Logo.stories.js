import Logo from '~/components/atoms/Logo.vue'

export default {
  component: Logo,
  title: 'atoms/Logo',
  template: '<Logo/>'
}

const Template = (args, { argTypes }) => ({
  components: { Logo },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<Logo/>'
})

export const Default = Template.bind({})

export const Compact = Template.bind({
  navbar: true
})
