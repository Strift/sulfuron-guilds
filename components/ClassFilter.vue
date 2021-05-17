<template>
  <div class="bg-blue-900 bg-opacity-50 flex items-center px-3 py-1 rounded-full space-x-2 text-gray-600">
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
import ClassIcon from '~/components/ui/ClassIcon.vue'
import CloseIcon from '~/components/icons/solid/CloseIcon.vue'

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
