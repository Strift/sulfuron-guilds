import PrimaryButton from '~/components/Base/PrimaryButton.vue'

export default {
  component: PrimaryButton,
  title: 'Base/PrimaryButton'
}

export const Primary = () => ({
  components: { PrimaryButton },
  template: '<PrimaryButton>Default</PrimaryButton>'
})
