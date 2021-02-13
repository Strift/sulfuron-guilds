<template>
  <div>
    <label :for="name" class="font-semibold text-blue-400 block leading-none text-shadow-sm mb-4">
      {{ label }}
    </label>
    <div class="group relative shadow-md">
      <select
        :id="name"
        :name="name"
        :readonly="disabled === true"
        class="focus:border-blue-300 focus:border-opacity-75 focus:text-gray-400 focus:shadow bg-blue-900 bg-opacity-25 border border-gray-700 text-gray-500 h-10 rounded px-3 outline-none shadow-sm block w-full appearance-none"
        @change="$emit('input', $event.target.value)"
      >
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
      <ChevronDownIcon class="inline absolute right-0 bottom-0 top-0 my-auto mr-3 text-gray-600 group-focus:text-gray-500" />
    </div>
  </div>
</template>

<script>

export default {
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
