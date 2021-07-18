<template>
  <transition-group :duration="250" name="fade" tag="div" class="flex flex-row flex-wrap">
    <ClassFilter
      v-for="filter in classFilters"
      :key="`${filter.classValue}/${filter.specName}`"
      :wow-class="filter.classValue"
      class="mb-4 mr-4"
      @remove="removeClassFilter(filter.classValue, filter.specValue)"
    >
      {{ filter.specName }}
    </ClassFilter>
  </transition-group>
</template>

<script>
import { mapGetters } from 'vuex'
import ClassFilter from '~/components/ClassFilter.vue'

export default {
  components: {
    ClassFilter
  },
  computed: {
    ...mapGetters('guilds', {
      classFilters: 'classFilters'
    })
  }
}
</script>
