<template>
  <div>
    <label :for="name" class="font-semibold text-blue-400 block mb-4 leading-none text-shadow-sm">
      {{ label }}
    </label>
    <div class="relative inline-block shadow-md">
      <input
        :id="name"
        :class="{ 'focus:border-blue-300 focus:text-blue-100 ': !disabled }"
        :name="name"
        :readonly="disabled === true"
        :value="value"
        type="text"
        class="bg-blue-900 bg-opacity-25 border border-gray-700 text-gray-500 h-10 rounded px-3 outline-none"
      >
      <LockIcon v-if="disabled" class="inline absolute right-0 bottom-0 top-0 my-auto mr-3 text-gray-700" />
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

</style>
