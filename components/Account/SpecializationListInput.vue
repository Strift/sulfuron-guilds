<template>
  <div>
    <BaseCheckListItem
      v-for="checkBox in checkBoxesToDisplay"
      :id="checkBox.id"
      :key="checkBox.id"
      :name="checkBox.id"
      :checked="checkBox.checked"
      @change="onChange(checkBox, $event)"
    >
      <div class="flex items-center space-x-2">
        <ClassIcon
          :class-slug="checkBox.classValue"
          :alt-text="checkBox.className"
          class="h-5"
        />
        <span v-if="checkBox.specValue">{{ checkBox.specName }}</span>
        <span v-else class="font-semibold text-gray-700">{{ checkBox.className }}</span>
      </div>
    </BaseCheckListItem>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import ClassIcon from '~/components/atoms/icons/ClassIcon.vue'
import getClassName from '~/data/utils/getClassName'
import getSpecName from '~/data/utils/getSpecName'

export default {
  components: {
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
              specName: getSpecName(wowClass.class, spec.value)
            })
          })
        } else {
          checkBoxes.push({
            id: wowClass.class,
            checked: false,
            classValue: wowClass.class,
            className: getClassName(wowClass.class)
          })
        }
      })
      return checkBoxes
    }
  },
  methods: {
    onChange ({ classValue, specValue }, checked) {
      const newState = cloneDeep(this.value)

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
