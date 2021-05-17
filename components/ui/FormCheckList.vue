<template>
  <div>
    <div :for="name" class="block font-semibold leading-none mb-4 text-blue-400 text-shadow-sm">
      {{ label }}
    </div>
    <div class="gap-x-6 gap-y-4 grid grid-cols-2 grid-flow-cols lg:grid-cols-5 md:grid-cols-3">
      <FormCheckBox
        v-for="(option, optionIndex) in options"
        :id="inputId(option)"
        :key="inputId(option)"
        :name="inputId(option)"
        :checked="isChecked(optionIndex)"
        @change="updateChecked($event, optionIndex)"
      >
        {{ option }}
      </FormCheckBox>
    </div>
  </div>
</template>

<script>
import FormCheckBox from '~/components/ui/FormCheckBox.vue'

export default {
  components: {
    FormCheckBox
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
    updateChecked (checked, optionIndex) {
      const updatedCheckStates = this.value
      updatedCheckStates[optionIndex] = checked
      this.$emit('input', updatedCheckStates)
    }
  }
}
</script>
