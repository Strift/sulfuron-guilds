<template>
  <div>
    <label :for="name" class="block font-semibold leading-none mb-4 text-blue-400 text-shadow-sm">
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
        :maxlength="maxLength"
        class="bg-blue-900 bg-opacity-25 block border border-gray-700 focus:border-blue-300 focus:border-opacity-75 focus:shadow focus:text-gray-400 h-10 outline-none placeholder-gray-700 px-3 rounded shadow-sm text-gray-500 w-full"
        @input="$emit('input', $event.target.value)"
      >
      <LockIcon v-if="disabled" class="absolute bottom-0 group-focus:text-gray-600 inline mr-3 my-auto right-0 text-gray-700 top-0" />
    </div>
    <div v-if="errorMessage" class="mt-2 text-red-500 text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import LockIcon from '~/components/atoms/icons/solid/LockIcon.vue'

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
    },
    maxLength: {
      type: Number,
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
