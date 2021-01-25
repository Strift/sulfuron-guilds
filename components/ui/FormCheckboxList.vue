<template>
  <div>
    <div :for="name" class="font-semibold text-blue-400 block leading-none text-shadow-sm mb-4">
      {{ label }}
    </div>
    <div class="flex justify-between">
      <label
        v-for="(inputLabel, i) in checkboxLabels"
        :key="inputId(inputLabel)"
        :for="inputId(inputLabel)"
        class="group flex space-x-2 items-center border border-gray-700 rounded px-3 h-10 shadow-sm"
        :class="{ 'bg-blue-900 bg-opacity-25': value[i] }"
      >
        <CheckIcon
          :class="{ 'text-gray-500': value[i], 'text-gray-600': !value[i] }"
          class="not-sr-only"
        />
        <input
          :id="inputId(inputLabel)"
          v-model="value[i]"
          :name="inputId(inputLabel)"
          :value="value[i]"
          type="checkbox"
          class="sr-only"
          @change="updateValue"
        >
        <span
          class="text-gray-500 text-shadow-sm"
          :class="{ 'text-gray-500': value[i], 'text-gray-600': !value[i] }"
        >{{ inputLabel }}</span>
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
    checkboxLabels: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  methods: {
    inputId (label) {
      return `${this.name}-${label}`
    },
    updateValue (event) {
      this.$emit('change', event.target.checked)
    }
  }
}
</script>

<style>

</style>
