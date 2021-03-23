<template>
  <div class="flex space-x-2 items-center bg-blue-900 bg-opacity-50 text-gray-600 py-1 px-3 rounded-full">
    <ClassIcon :wow-class="wowClass" class="h-5" />
    <div>
      <slot name="default" />
    </div>
    <button class="hover:text-blue-300" @click="$emit('remove')">
      <CloseIcon class="h-5 w-5" />
    </button>
  </div>
</template>

<script>
import ClassIcon from '~/components/icons/ClassIcon.vue'
import CloseIcon from '~/components/icons/CloseIcon.vue'

export default {
  components: {
    ClassIcon,
    CloseIcon
  },
  props: {
    wowClass: {
      type: String,
      required: true
    }
  }
}
</script>
