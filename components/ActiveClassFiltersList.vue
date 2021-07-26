<template>
  <transition-group :duration="100" name="fade" tag="div" class="flex flex-row flex-wrap">
    <ActiveFilter
      v-for="filter in activeClassFilters"
      :key="specializationSlug(filter.classValue, filter.specName)"
      :wow-class="filter.classValue"
      class="mb-4 mr-4"
      @remove="setClassFilter({ classValue: filter.classValue, specValue: filter.specValue }, false)"
    >
      <template class="space-x-2">
        <SpecializationIcon
          :class-value="filter.classValue"
          :spec-value="filter.specValue"
          :alt="`Icone ${filter.className} spéciliasation ${filter.specName}`"
          :title="filter.specName"
          height="20"
          width="20"
          class="inline mr-2"
        />
        <span>{{ filter.specName }}</span>
      </template>
    </ActiveFilter>
  </transition-group>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ActiveFilter from '~/components/ui/ActiveFilter.vue'
import SpecializationIcon from '~/components/ui/SpecializationIcon.vue'
import useGuildsStore from '~/composables/useGuildsStore'
import specializationSlug from '~/data/utils/specializationSlug'

export default defineComponent({
  components: {
    ActiveFilter,
    SpecializationIcon
  },
  setup () {
    const { activeClassFilters, setClassFilter } = useGuildsStore()

    return {
      specializationSlug,
      activeClassFilters,
      setClassFilter
    }
  }
})
</script>
