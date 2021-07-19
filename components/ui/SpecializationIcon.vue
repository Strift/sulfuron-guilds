<template>
  <img
    :src="`/images/class-icons/${imageSlug}.jpg`"
    :alt="altText"
    class="rounded-sm"
  >
</template>

<script>
import { defineComponent, computed, toRefs } from '@nuxtjs/composition-api'
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
    altText: {
      type: String,
      required: true
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
