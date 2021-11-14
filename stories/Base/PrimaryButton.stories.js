import PrimaryButtonComponent from '~/components/Base/PrimaryButton.vue'

export default {
  component: PrimaryButtonComponent,
  title: 'Base/PrimaryButton'
}

export const PrimaryButton = () => ({
  components: { PrimaryButton: PrimaryButtonComponent },
  template: '<PrimaryButton>Default</PrimaryButton>'
})
