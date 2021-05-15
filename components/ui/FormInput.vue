<template>
  <div>
    <label :for="name" class="font-semibold text-blue-400 block leading-none text-shadow-sm mb-4">
      {{ label }}
    </label>
    <div class="group relative shadow-md">
      <input
        :id="name"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :readonly="disabled === true"
        :value="value"
        class="focus:border-blue-300 focus:border-opacity-75 focus:text-gray-400 focus:shadow bg-blue-900 bg-opacity-25 border border-gray-700 text-gray-500 placeholder-gray-700 h-10 rounded px-3 outline-none shadow-sm block w-full"
        @input="$emit('input', $event.target.value)"
      >
      <LockIcon v-if="disabled" class="inline absolute right-0 bottom-0 top-0 my-auto mr-3 text-gray-700 group-focus:text-gray-600" />
    </div>
    <div v-if="errorMessage" class="mt-2 text-red-500 text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import LockIcon from '~/components/icons/solid/LockIcon.vue'

export default {
  components: {
    LockIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
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
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    errorMessage: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
input:focus + svg {
  @apply text-gray-500;
}

::calendar-picker-indicator {
  filter: invert()
}
</style>
