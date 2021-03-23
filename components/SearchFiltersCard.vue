<template>
  <div class="border border-blue-300 bg-gray-900 bg-opacity-50 p-6 rounded-lg text-gray-500">
    <div class="text-xs font-bold tracking-wider uppercase text-gray-300 mb-4">
      Classes
    </div>
    <FormSpecsList
      v-model="classFilters"
      class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2 sm:gap-y-4"
    />
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'

import FormSpecsList from '~/components/ui/FormSpecsList.vue'

import WOW_CLASSES from '~/data/classes.json'

export default {
  components: {
    FormSpecsList
  },
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
