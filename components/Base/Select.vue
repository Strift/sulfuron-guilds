<template>
  <div>
    <label :for="name" class="block font-semibold leading-none mb-4 text-blue-400 text-shadow-sm">
      {{ label }}
    </label>
    <div class="group relative shadow-md">
      <select
        :id="name"
        :name="name"
        :readonly="disabled === true"
        class="appearance-none bg-blue-900 bg-opacity-25 block border border-gray-700 focus:border-blue-300 focus:border-opacity-75 focus:shadow focus:text-gray-400 h-10 outline-none px-3 rounded shadow-sm text-gray-500 w-full"
        required
        @change="$emit('input', $event.target.value)"
        @focus="$emit('focus', $event.target.value)"
      >
        <option
          v-if="placeholder && !value"
          value=""
          class="bg-gray-300 font-semibold text-gray-800"
        >
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === value"
          class="bg-gray-300 text-gray-800"
        >
          {{ option.label }}
        </option>
      </select>
      <ChevronDownIcon class="absolute bottom-0 group-focus:text-gray-500 inline mr-3 my-auto right-0 text-gray-600 top-0" />
    </div>
  </div>
</template>

<script>
import ChevronDownIcon from '~/components/atoms/icons/solid/ChevronDownIcon.vue'

export default {
  components: {
    ChevronDownIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
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
    options: {
      type: Array,
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
