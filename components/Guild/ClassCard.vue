<template>
  <div class="bg-gray-900 bg-opacity-75 p-5 rounded">
    <div class="-mt-8 flex">
      <div :class="['bg-gray-800 px-3 py-1 uppercase tracking-widest text-xs rounded shadow-sm mb-4', titleClass]">
        {{ title }}
      </div>
    </div>
    <div class="text-gray-600">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    titleClass: {
      type: String,
      required: true
    }
  }
})
</script>
