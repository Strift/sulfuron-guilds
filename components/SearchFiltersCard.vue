<template>
  <div class="bg-gray-900 bg-opacity-50 border border-blue-300 p-6 rounded-lg text-gray-500">
    <div class="font-bold mb-4 text-gray-300 text-xs tracking-wider uppercase">
      Classes
    </div>
    <AccountSpecializationListInput
      v-model="classFilters"
      class="gap-x-6 gap-y-2 grid grid-cols-1 lg:grid-cols-5 sm:gap-y-4 sm:grid-cols-3"
    />
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'

import WOW_CLASSES from '~/data/classes.json'

export default {
  computed: {
    classFilters: {
      get () {
        return this.$store.state.guilds.classFilters
      },
      set (value) {
        this.$store.commit('guilds/setClassFilters', value)
      }
    }
  },
  created () {
    this.initSpecsFilters()
  },
  methods: {
    initSpecsFilters () {
      this.classFilters = sortBy(WOW_CLASSES, 'name')
        .map(wowClass => ({
          class: wowClass.value,
          specs: wowClass.specs.map(spec => ({ ...spec, checked: false }))
        }))
    }
  }
}
</script>
