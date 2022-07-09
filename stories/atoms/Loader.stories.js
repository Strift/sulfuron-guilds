import BaseLoader from '~/components/atoms/BaseLoader.vue'

export default {
  component: BaseLoader,
  title: 'atoms/BaseLoader',
  template: '<BaseLoader/>'
}

const Template = (args, { argTypes }) => ({
  components: { Loader: BaseLoader },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<BaseLoader/>'
})

export const Default = Template.bind({})
