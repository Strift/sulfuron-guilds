<template>
  <div>
    <ActiveClassFiltersList />
    <div class="space-y-4">
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
              @change="onChange({ classValue: wowClass.value, specValue: spec.value }, $event.target.checked)"
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
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import SpecializationIcon from './ui/SpecializationIcon.vue'
import SecondaryButton from './ui/SecondaryButton.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'
import ActiveClassFiltersList from '~/components/ActiveClassFiltersList.vue'
import specializationSlug from '~/data/utils/specializationSlug'
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
    const classToggles = sortBy(WOW_CLASSES, 'name')
      .map((wowClass) => {
        const { isOn: isExpanded, toggle } = useToggle(false)
        return {
          isExpanded,
          toggle,
          ...wowClass
        }
      })

    const { filters: classFilters, setFilter: setClassFilter } = useClassFilters()
    const store = useStore()

    const onChange = ({ classValue, specValue }, checked) => {
      setClassFilter({ classValue, specValue }, checked)
      store.commit('guilds/setClassFilters', cloneDeep(classFilters.value))
    }
    return {
      classToggles,
      specializationSlug,
      onChange
    }
  }
})
</script>
