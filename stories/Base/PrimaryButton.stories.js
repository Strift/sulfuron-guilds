import PrimaryButton from '~/components/Base/PrimaryButton.vue'

export default {
  component: PrimaryButton,
  title: 'Base/PrimaryButton'
}

export const Default = () => ({
  components: { PrimaryButton },
  template: '<PrimaryButton>Default</PrimaryButton>'
})
