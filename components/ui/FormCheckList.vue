<template>
  <div>
    <div :for="name" class="font-semibold text-blue-400 block leading-none text-shadow-sm mb-4">
      {{ label }}
    </div>
    <div class="grid grid-flow-cols grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
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
