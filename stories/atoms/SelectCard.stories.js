import SelectCard from '~/components/atoms/SelectCard.vue'

export default {
  component: SelectCard,
  args: {
    selected: false
  },
  title: 'atoms/SelectCard'
}

const Template = (args, { argTypes }) => ({
  components: { SelectCard },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: `
  <SelectCard v-bind="$props">
    <template slot="header">Header</template>
  </SelectCard>
  `
})

export const Default = Template.bind({})
Default.args = {
  selectedBorderClass: 'border-druid',
  headerClass: 'text-druid'
}

export const Selected = Template.bind({})
Selected.args = {
  selected: true,
  selectedBorderClass: 'border-druid',
  headerClass: 'text-druid'
}
