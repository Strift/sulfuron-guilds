<template>
  <div>
    <label :for="name" class="font-semibold text-blue-400 block mb-4 leading-none text-shadow-sm">
      {{ label }}
    </label>
    <div class="group relative inline-block shadow-md">
      <input
        :id="name"
        :class="{ 'focus:border-blue-300 focus:text-gray-400 focus:shadow': !disabled, 'focus:border-gray-600': disabled }"
        :name="name"
        :readonly="disabled === true"
        :value="value"
        type="text"
        class="bg-blue-900 bg-opacity-25 border border-gray-700 text-gray-500 h-10 rounded px-3 outline-none shadow-sm"
      >
      <LockIcon v-if="disabled" class="inline absolute right-0 bottom-0 top-0 my-auto mr-3 text-gray-700 group-focus:text-gray-600" />
    </div>
  </div>
</template>

<script>
import LockIcon from '~/components/icons/LockIcon.vue'

export default {
  components: {
    LockIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
input:focus + svg {
  @apply text-gray-500;
}
</style>
