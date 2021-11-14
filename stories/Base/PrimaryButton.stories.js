import PrimaryButton from '~/components/Base/PrimaryButton.vue'

export default {
  component: PrimaryButton,
  title: 'Base/PrimaryButton',
  parameters: {
    backgrounds: {
      default: 'gray-900'
    }
  }
}

export const Default = () => ({
  components: { PrimaryButton },
  template: '<PrimaryButton>Default</PrimaryButton>'
})
