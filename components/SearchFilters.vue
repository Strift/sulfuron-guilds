<template>
  <div>
    <ActiveClassFiltersList />
    <div class="space-y-4">
      <div v-for="wowClass in classesToggles" :key="wowClass.value">
        <button
          class="flex font-semibold items-center justify-between mb-3 text-blue-300 w-56"
          @click="wowClass.toggle()"
        >
          <span class="text-sm">
            {{ wowClass.name }}
          </span>
          <ChevronDownIcon />
        </button>
        <div v-show="wowClass.expanded.value" class="space-y-1">
          <label v-for="spec in wowClass.specs" :key="spec.value" class="flex items-center space-x-3">
            <input
              :id="specializationSlug(wowClass.value, spec.value)"
              :name="spec.name"
              type="checkbox"
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SpecializationIcon from './ui/SpecializationIcon.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'
import ActiveClassFiltersList from '~/components/ActiveClassFiltersList.vue'
import specializationSlug from '~/data/utils/specializationSlug'
import useToggle from '~/composables/useToggle'

import WOW_CLASSES from '~/data/classes.json'

export default defineComponent({
  components: {
    ChevronDownIcon,
    ActiveClassFiltersList,
    SpecializationIcon
  },
  setup () {
    const classesToggles = sortBy(WOW_CLASSES, 'name')
      .map((wowClass) => {
        const { isOn: expanded, toggle } = useToggle(false)
        return {
          expanded,
          toggle,
          ...wowClass
        }
      })

    return {
      classesToggles,
      specializationSlug
    }
  }
})
</script>
