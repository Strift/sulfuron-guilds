<template>
  <nuxt-img
    :src="`/images/class-icon-${classSlug}.png`"
    :alt="altText"
    height="24"
    width="24"
  />
</template>

<script>
import PropTypes from '@znck/prop-types'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    classSlug: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired
  }
})
</script>
