<template>
  <label
    :for="name"
    class="group flex space-x-2 items-center border border-gray-700 rounded px-3 h-10 shadow-sm focus-within:border-blue-300 focus-within:border-opacity-75 focus-within:text-gray-400 focus-within:shadow min-w-0"
    :class="{
      'bg-blue-900 bg-opacity-25': checked,
      'bg-gray-900 bg-opacity-25': !checked
    }"
  >
    <CheckIcon
      :class="{ 'text-gray-500': checked, 'text-gray-700': !checked }"
      class="not-sr-only"
    />
    <input
      :id="id"
      :name="name"
      :checked="checked"
      type="checkbox"
      class="sr-only"
      @change="$emit('change', $event.target.checked)"
    >
    <div
      class="text-gray-500 text-shadow-sm truncate"
      :class="{ 'text-gray-500': checked, 'text-gray-600': !checked }"
    >
      <slot name="default" />
    </div>
  </label>
</template>

<script>
import CheckIcon from '~/components/icons/solid/CheckIcon.vue'

export default {
  name: 'FormCheckBox',
  components: {
    CheckIcon
  },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  }
}
</script>
