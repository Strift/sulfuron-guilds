<template>
  <div class="border border-blue-300 bg-gray-900 bg-opacity-50 p-5 rounded-lg text-gray-500">
    <div class="text-xs font-bold tracking-wider uppercase text-gray-300 mb-2">
      Classes
    </div>
    <div class="space-y-2">
      <div v-for="wowClass in wowClasses" :key="wowClass.value" class="space-y-2">
        <FormCheckBox
          v-for="spec in wowClass.specs"
          :id="inputName(wowClass, spec)"
          :key="spec.value"
          :name="inputName(wowClass, spec)"
          :checked="false"
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
    wowClasses: WOW_CLASSES.sort(sortByName)
  }),
  methods: {
    inputName (wowClass, spec) {
      return `${wowClass.value}-${spec.value}`
    }
  }
}
</script>
