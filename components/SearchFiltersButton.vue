<template>
  <button
    :class="{ 'text-gray-500 border-gray-500': !active, 'text-blue-300 border-blue-300': active }"
    class="bg-blue-900 bg-opacity-25 border flex focus:border-blue-300 focus:outline-none focus:text-gray-400 hover:bg-opacity-50 hover:shadow-lg hover:text-blue-200 items-center px-4 py-2 rounded-full shadow-md space-x-2 text-center text-shadow-sm"
    @click="$emit('click')"
  >
    <FilterIcon />
    <span class="hidden sm:inline">Filtres</span>
  </button>
</template>

<script>
import FilterIcon from '~/components/atoms/icons/solid/FilterIcon.vue'

export default {
  components: {
    FilterIcon
  },
  props: {
    active: {
      type: Boolean,
      required: true
    }
  }
}
</script>
