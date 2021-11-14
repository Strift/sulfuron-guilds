import Loader from '~/components/Ui/Loader.vue'

export default {
  component: Loader,
  title: 'UI/Loader',
  template: '<Loader/>'
}

const Template = (args, { argTypes }) => ({
  components: { Loader },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<Loader/>'
})

export const Default = Template.bind({})
