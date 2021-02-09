<template>
  <div>
    <div :for="name" class="font-semibold text-blue-400 block leading-none text-shadow-sm mb-4">
      {{ label }}
    </div>
    <div class="grid grid-flow-cols grid-cols-5 gap-x-6 gap-y-4">
      <label
        v-for="(option, optionIndex) in options"
        :key="inputId(option)"
        :for="inputId(option)"
        class="group flex space-x-2 items-center border border-gray-700 rounded px-3 h-10 shadow-sm focus-within:border-blue-300 focus-within:border-opacity-75 focus-within:text-gray-400 focus-within:shadow min-w-0"
        :class="{
          'bg-blue-900 bg-opacity-25': isChecked(optionIndex),
          'bg-gray-900 bg-opacity-25': !isChecked(optionIndex)
        }"
      >
        <CheckIcon
          :class="{ 'text-gray-500': isChecked(optionIndex), 'text-gray-700': !isChecked(optionIndex) }"
          class="not-sr-only"
        />
        <input
          :id="inputId(option)"
          :name="inputId(option)"
          :checked="isChecked(optionIndex)"
          type="checkbox"
          class="sr-only"
          @change="onChange($event, optionIndex)"
        >
        <span
          class="text-gray-500 text-shadow-sm"
          :class="{ 'text-gray-500': isChecked(optionIndex), 'text-gray-600': !isChecked(optionIndex) }"
        >{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import CheckIcon from '~/components/icons/CheckIcon.vue'

export default {
  components: {
    CheckIcon
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
    value: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    inputId (option) {
      return `${this.name}-${option}`
    },
    isChecked (index) {
      return this.value[index]
    },
    onChange (event, optionIndex) {
      const updatedCheckStates = this.value
      updatedCheckStates[optionIndex] = event.target.checked
      this.$emit('input', updatedCheckStates)
    }
  }
}
</script>
