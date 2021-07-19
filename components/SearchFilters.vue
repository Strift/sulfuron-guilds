<template>
  <div>
    <div class="space-y-6">
      <div v-for="wowClass in classToggles" :key="wowClass.value">
        <SecondaryButton
          class="flex items-center justify-between w-full"
          @click="wowClass.toggle"
        >
          {{ wowClass.name }}
          <ChevronDownIcon class="duration-150 transform transition-transform" :class="{ 'rotate-180': wowClass.isExpanded.value }" />
        </SecondaryButton>
        <div v-show="wowClass.isExpanded.value" class="mt-4 space-y-2">
          <label v-for="spec in wowClass.specs" :key="spec.value" class="flex items-center space-x-3">
            <input
              :id="specializationSlug(wowClass.value, spec.value)"
              :name="spec.name"
              type="checkbox"
              @change="updateClassFilter({ classValue: wowClass.value, specValue: spec.value }, $event.target.checked)"
            >
            <SpecializationIcon
              :class-value="wowClass.value"
              :spec-value="spec.value"
              :alt-text="`Icone ${wowClass.name} spéciliasation ${spec.name}`"
              height="20"
              width="20"
              class="inline"
            />
            <span>{{ spec.name }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import SpecializationIcon from './ui/SpecializationIcon.vue'
import SecondaryButton from './ui/SecondaryButton.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'
import ActiveClassFiltersList from '~/components/ActiveClassFiltersList.vue'
import specializationSlug from '~/data/utils/specializationSlug'
import findClassIndex from '~/data/utils/findClassIndex'
import useToggle from '~/composables/useToggle'
import useClassFilters from '~/composables/useClassFilters'

import WOW_CLASSES from '~/data/classes.json'

export default defineComponent({
  components: {
    ChevronDownIcon,
    ActiveClassFiltersList,
    SpecializationIcon,
    SecondaryButton
  },
  setup () {
    const { filters: classFilters, setFilter: setClassFilter } = useClassFilters()
    const store = useStore()

    const updateClassFilter = ({ classValue, specValue }, checked) => {
      setClassFilter({ classValue, specValue }, checked)
      store.commit('guilds/setClassFilters', cloneDeep(classFilters.value))
    }

    const classToggles = sortBy(WOW_CLASSES, 'name')
      .map((wowClass) => {
        const { isOn, toggle } = useToggle(false)
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
      updateClassFilter
    }
  }
})
</script>
