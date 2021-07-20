<template>
  <div class="flex flex-row flex-wrap justify-between">
    <div
      v-for="wowClass in classToggles"
      :key="wowClass.value"
      class="bg-gray-900 bg-opacity-75 border-t-4 px-5 py-4 rounded-b shadow"
      :class="`border-${wowClass.value}`"
    >
      <div class="font-semibold mb-3 text-gray-500 text-sm">
        {{ wowClass.name }}
      </div>
      <div class="flex space-x-3">
        <!-- <FormCheckBox
          v-for="spec in wowClass.specs"
          :id="specializationSlug(wowClass.value, spec.value)"
          :key="spec.value"
          :name="specializationSlug(wowClass.value, spec.value)"
          :checked="isChecked({ classValue: wowClass.value, specValue: spec.value })"
          class="w-20"
          @change="updateClassFilter({ classValue: wowClass.value, specValue: spec.value }, $event)"
        > -->
        <!-- </FormCheckBox> -->
        <label
          v-for="spec in wowClass.specs"
          :key="spec.value"
          :title="spec.name"
          class="flex flex-col space-y-2"
        >
          <SpecializationIcon
            :class-value="wowClass.value"
            :spec-value="spec.value"
            :alt="`Icone ${wowClass.name} spéciliasation ${spec.name}`"
            :title="spec.name"
            height="20"
            width="20"
            :grayscale="!isChecked({ classValue: wowClass.value, specValue: spec.value })"
          />
          <input
            :id="specializationSlug(wowClass.value, spec.value)"
            :name="spec.name"
            type="checkbox"
            class="mx-auto"
            @change="updateClassFilter({ classValue: wowClass.value, specValue: spec.value }, $event.target.checked)"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

import FormCheckBox from '~/components/ui/FormCheckBox.vue'
import SpecializationIcon from '~/components/ui/SpecializationIcon.vue'
import SecondaryButton from '~/components/ui/SecondaryButton.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'
import ActiveClassFiltersList from '~/components/ActiveClassFiltersList.vue'

import specializationSlug from '~/data/utils/specializationSlug'
import findClassIndex from '~/data/utils/findClassIndex'

import useToggle from '~/composables/useToggle'
import useClassFilters from '~/composables/useClassFilters'

import WOW_CLASSES from '~/data/classes.json'
import findSpecIndex from '~/data/utils/findSpecIndex'

export default defineComponent({
  components: {
    FormCheckBox,
    ChevronDownIcon,
    ActiveClassFiltersList,
    SpecializationIcon,
    SecondaryButton
  },
  setup () {
    const { filters: classFilters, setFilter: setClassFilter, isChecked } = useClassFilters()
    const store = useStore()

    const updateClassFilter = ({ classValue, specValue }, checked) => {
      setClassFilter({ classValue, specValue }, checked)
      store.commit('guilds/setClassFilters', cloneDeep(classFilters.value))
    }

    const classToggles = sortBy(WOW_CLASSES, 'name')
      .map((wowClass) => {
        const { isOn, toggle } = useToggle(true)
        const isExpanded = computed(() => {
          const classIndex = findClassIndex(classFilters.value, wowClass.value)
          return isOn.value || classFilters.value[classIndex].specs.some(({ checked }) => checked)
        })
        return {
          isExpanded,
          toggle,
          ...wowClass
        }
      })
    return {
      classToggles,
      specializationSlug,
      updateClassFilter,
      isChecked
    }
  }
})
</script>
