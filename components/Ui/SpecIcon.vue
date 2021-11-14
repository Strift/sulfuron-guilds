<template>
  <nuxt-img
    :src="`/images/class-icons/${specializationSlug}.jpg`"
    :alt="altText"
    class="rounded-sm"
    :class="{ 'grayscale-75': grayscale }"
  />
</template>

<script>
import PropTypes from '@znck/prop-types'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    specializationSlug: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    grayscale: { type: Boolean, default: false }
    // Not recognized by Storybook
    // grayscale: PropTypes.bool.defaultValue(false)
  }
})
</script>
