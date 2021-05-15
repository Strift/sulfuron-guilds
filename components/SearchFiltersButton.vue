<template>
  <button
    :class="{ 'text-gray-500 border-gray-500': !active, 'text-blue-300 border-blue-300': active }"
    class="px-4 py-2 rounded-full text-center text-shadow-sm bg-opacity-25 border hover:bg-opacity-50 shadow-md hover:shadow-lg bg-blue-900  hover:text-blue-200 flex space-x-2 items-center focus:outline-none focus:border-blue-300 focus:text-gray-400"
    @click="$emit('click')"
  >
    <FilterIcon />
    <span class="hidden sm:inline">Filtres</span>
  </button>
</template>

<script>
import FilterIcon from '~/components/icons/solid/FilterIcon.vue'

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
