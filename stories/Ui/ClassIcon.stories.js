import ClassIcon from '~/components/Ui/ClassIcon.vue'

export default {
  component: ClassIcon,
  args: {
    classSlug: 'rogue',
    altText: 'Voleur'
  },
  title: 'UI/ClassIcon'
}

const Template = (args, { argTypes }) => ({
  components: { ClassIcon },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<ClassIcon v-bind="$props" />'
})

export const Default = Template.bind({})