<template>
  <div class="grid grid-cols-3 gap-4">
    <FormCheckBox
      v-for="classOrSpec in checkBoxes"
      :id="inputName(classOrSpec)"
      :key="inputName(classOrSpec)"
      :name="inputName(classOrSpec)"
      :checked="isSelected(classOrSpec)"
      @change="updateSelectedClassesAndSpecs(classOrSpec, $event)"
    >
      <div v-if="classOrSpec.classValue" class="flex space-x-2 items-center">
        <ClassIcon :wow-class="classOrSpec.classValue" class="h-5" />
        <span>{{ classOrSpec.name }}</span>
      </div>
      <div v-else class="flex space-x-2 items-center">
        <ClassIcon :wow-class="classOrSpec.value" class="h-5" />
        <span class="font-semibold text-gray-700">{{ classOrSpec.name }}</span>
      </div>
    </FormCheckBox>
  </div>
</template>

<script>
import FormCheckBox from '~/components/ui/FormCheckBox.vue'
import ClassIcon from '~/components/icons/ClassIcon.vue'

import WOW_CLASSES from '~/data/classes.json'

const sortByName = (classA, classB) => {
  if (classA.name < classB.name) {
    return -1
  }
  if (classA.name > classB.name) {
    return 1
  }
  return 0
}

export default {
  components: {
    FormCheckBox,
    ClassIcon
  },
  data: () => ({
    selectedClasses: [],
    selectedSpecs: {}
  }),
  computed: {
    checkBoxes () {
      return WOW_CLASSES
        .sort(sortByName)
        .map((wowClass) => {
          return this.isClassSelected(wowClass.value)
            ? wowClass.specs.map(spec => ({ ...spec, classValue: wowClass.value }))
            : wowClass
        })
        .reduce((array, classOrSpecs) => {
          // it's either an object (the class) or an array (the specs array)
          return Array.isArray(classOrSpecs)
            ? array.concat(classOrSpecs)
            : [...array, classOrSpecs]
        }, [])
    },
    formattedSelectedSpecs () {
      return WOW_CLASSES.map(wowClass => ({
        class: wowClass.value,
        specs: wowClass.specs.map(spec => ({
          value: spec.value,
          checked: this.selectedSpecs[wowClass.value].includes(spec.value)
        }))
      }))
    }
  },
  created () {
    WOW_CLASSES.forEach((wowClass) => {
      this.$set(this.selectedSpecs, wowClass.value, [])
    })
  },
  methods: {
    inputName (classOrSpec) {
      return classOrSpec.classValue
        ? `${classOrSpec.classValue}-${classOrSpec.value}`
        : classOrSpec.value
    },
    isClass (classOrSpec) {
      return classOrSpec.specs !== undefined
    },
    updateSelectedClassesAndSpecs (classOrSpec, checked) {
      if (this.isClass(classOrSpec)) { // it's a class
        this.updateSelectedClasses(classOrSpec.value, classOrSpec.specs, checked)
      } else { // it's a spec
        this.updateSelectedSpecs(classOrSpec.classValue, classOrSpec.value, checked)
      }
      this.$emit('update', this.formattedSelectedSpecs)
    },
    updateSelectedClasses (classValue, classSpecs, checked) {
      if (checked) {
        this.selectedClasses.push(classValue)
        this.selectedSpecs[classValue] = classSpecs.map(spec => spec.value)
      }
    },
    updateSelectedSpecs (classValue, specValue, checked) {
      if (checked) {
        this.selectedSpecs[classValue].push(specValue)
      } else {
        const index = this.selectedSpecs[classValue].indexOf(specValue)
        this.selectedSpecs[classValue].splice(index, 1)
        if (this.selectedSpecs[classValue].length === 0) {
          this.removeSelectedClass(classValue)
        }
      }
    },
    removeSelectedClass (classValue) {
      const index = this.selectedClasses.indexOf(classValue)
      this.selectedClasses.splice(index, 1)
    },
    isSelected (classOrSpec) {
      return this.isClass(classOrSpec)
        ? this.isClassSelected(classOrSpec)
        : this.isSpecSelected(classOrSpec.classValue, classOrSpec.value)
    },
    isClassSelected (classValue) {
      return this.selectedClasses.includes(classValue)
    },
    isSpecSelected (classValue, specValue) {
      return this.selectedSpecs[classValue].includes(specValue)
    }
  }
}
</script>
