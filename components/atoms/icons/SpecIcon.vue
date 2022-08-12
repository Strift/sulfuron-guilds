<script>
import { defineComponent } from '@nuxtjs/composition-api'
import PropTypes from '@znck/prop-types'

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

<template>
  <nuxt-img
    :src="`/images/class-icons/${specializationSlug}.jpg`"
    :alt="altText"
    class="rounded-sm"
    :class="{ 'grayscale-75': grayscale }"
  />
</template>
