<script>
import { defineComponent } from '@nuxtjs/composition-api'
import PropTypes from '@znck/prop-types'

export default defineComponent({
  props: {
    classSlug: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired
  }
})
</script>

<template>
  <nuxt-img
    :src="`/images/class-icon-${classSlug}.png`"
    :alt="altText"
    height="24"
    width="24"
  />
</template>
