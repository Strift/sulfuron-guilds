<template>
  <div class="border border-blue-300 bg-gray-900 bg-opacity-50 p-5 rounded-lg text-gray-500">
    <div class="text-xs font-bold tracking-wider uppercase text-gray-300 mb-2">
      Classes
    </div>
    <div class="space-y-2">
      <div v-for="wowClass in wowClasses" :key="wowClass.value" class="space-y-2">
        <FormCheckBox
          v-show="!isClassSelected(wowClass.value)"
          :id="wowClass.value"
          :key="wowClass.value"
          :name="wowClass.value"
          :checked="isClassSelected(wowClass.value)"
          @change="updateSelectedClasses(wowClass.value, wowClass.specs, $event)"
        >
          <div class="flex space-x-2 items-center">
            <ClassIcon :wow-class="wowClass.value" class="h-5" />
            <span class="font-semibold text-gray-700">{{ wowClass.name }}</span>
          </div>
        </FormCheckBox>
        <FormCheckBox
          v-for="spec in wowClass.specs"
          v-show="isClassSelected(wowClass.value)"
          :id="inputName(wowClass, spec)"
          :key="spec.value"
          :name="inputName(wowClass, spec)"
          :checked="isSpecSelected(wowClass.value, spec.value)"
          @change="updateSelectedSpecs(wowClass.value, spec.value, $event)"
        >
          <div class="flex space-x-2 items-center">
            <ClassIcon :wow-class="wowClass.value" class="h-5" />
            <span>{{ spec.name }}</span>
          </div>
        </FormCheckBox>
      </div>
    </div>
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
    selectedSpecs: {},
    wowClasses: WOW_CLASSES.sort(sortByName)
  }),
  created () {
    WOW_CLASSES.forEach((wowClass) => {
      this.$set(this.selectedSpecs, wowClass.value, [])
    })
  },
  methods: {
    inputName (wowClass, spec) {
      return `${wowClass.value}-${spec.value}`
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
    isClassSelected (classValue) {
      return this.selectedClasses.includes(classValue)
    },
    isSpecSelected (classValue, specValue) {
      return this.selectedSpecs[classValue].includes(specValue)
    }
  }
}
</script>
