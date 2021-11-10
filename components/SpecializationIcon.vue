<template>
  <nuxt-img
    :src="`/images/class-icons/${imageSlug}.jpg`"
    :alt="alt"
    class="rounded-sm"
    :class="{ 'grayscale-75': grayscale }"
  />
</template>

<script>
import { computed, defineComponent, toRefs } from '#app'
import specializationSlug from '~/data/utils/specializationSlug'

export default defineComponent({
  props: {
    classValue: {
      type: String,
      required: true
    },
    specValue: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    grayscale: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { classValue, specValue } = toRefs(props)
    const imageSlug = computed(() => specializationSlug(classValue.value, specValue.value))
    return {
      imageSlug
    }
  }
})
</script>
