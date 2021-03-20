<template>
  <div class="grid grid-cols-3 gap-4">
    <FormCheckBox
      v-for="checkBox in checkBoxesToDisplay"
      :id="checkBox.id"
      :key="checkBox.id"
      :name="checkBox.id"
      :checked="checkBox.checked"
      @change="onChange(checkBox, $event)"
    >
      <div class="flex space-x-2 items-center">
        <ClassIcon :wow-class="checkBox.classValue" class="h-5" />
        <span v-if="checkBox.specValue">{{ checkBox.specName }}</span>
        <span v-else class="font-semibold text-gray-700">{{ checkBox.className }}</span>
      </div>
    </FormCheckBox>
  </div>
</template>

<script>
import FormCheckBox from '~/components/ui/FormCheckBox.vue'
import ClassIcon from '~/components/icons/ClassIcon.vue'

import WOW_CLASSES from '~/data/classes.json'

const className = (classValue) => {
  const { name } = WOW_CLASSES.find(wowClass => wowClass.value === classValue)
  return name
}

const specName = (classValue, specValue) => {
  const wowClass = WOW_CLASSES.find(wowClass => wowClass.value === classValue)
  const { name } = wowClass.specs.find(spec => spec.value === specValue)
  return name
}

export default {
  components: {
    FormCheckBox,
    ClassIcon
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    checkBoxesToDisplay () {
      const checkBoxes = []
      this.value.forEach((wowClass) => {
        const someSpecChecked = wowClass.specs.some(spec => spec.checked)
        if (someSpecChecked) {
          wowClass.specs.forEach((spec) => {
            checkBoxes.push({
              id: `${wowClass.class}-${spec.value}`,
              checked: spec.checked,
              classValue: wowClass.class,
              specValue: spec.value,
              specName: specName(wowClass.class, spec.value)
            })
          })
        } else {
          checkBoxes.push({
            id: wowClass.class,
            checked: false,
            classValue: wowClass.class,
            className: className(wowClass.class)
          })
        }
      })
      return checkBoxes
    }
  },
  methods: {
    onChange ({ classValue, specValue }, checked) {
      const newState = this.value

      const classIndex = newState.findIndex(wowClass => wowClass.class === classValue)

      if (specValue === undefined) {
        newState[classIndex].specs = newState[classIndex].specs.map(spec => ({ ...spec, checked: true }))
      } else {
        const specIndex = newState[classIndex].specs.findIndex(spec => spec.value === specValue)
        newState[classIndex].specs[specIndex].checked = checked
      }
      this.$emit('input', newState)
    }
  }
}
</script>
