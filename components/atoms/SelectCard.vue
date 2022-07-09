<template>
  <div
    class="px-5 py-4 space-y-4 bg-gray-900 bg-opacity-75 border-t-4 rounded-b shadow"
    :class="selected ? selectedBorderClass : 'border-gray-900'"
  >
    <div :class="[ headerClass ]">
      <slot name="header" />
    </div>
    <slot name="default" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import PropTypes from '@znck/prop-types'

export default defineComponent({
  props: {
    selected: { type: Boolean, required: true },
    selectedBorderClass: PropTypes.string.isRequired,
    headerClass: PropTypes.string.isRequired
  }
})
</script>
