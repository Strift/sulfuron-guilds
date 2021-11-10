import { ref } from '#app'

export default function useToggle (onByDefault = false) {
  const isOn = ref(onByDefault)
  const toggle = () => {
    isOn.value = !isOn.value
  }
  return { isOn, toggle }
}
