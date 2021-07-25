import { ref } from '@nuxtjs/composition-api'

export default function useToggle (onByDefault = false) {
  const isOn = ref(onByDefault)
  const toggle = () => {
    isOn.value = !isOn.value
  }
  return { isOn, toggle }
}
