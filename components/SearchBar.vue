<template>
  <div class="relative shadow-md">
    <input
      id="search-bar"
      name="search"
      type="text"
      placeholder="Nyk Trib..."
      :value="value"
      class="bg-blue-900 bg-opacity-25 block border border-gray-700 focus:border-blue-300 focus:border-opacity-75 focus:shadow focus:text-gray-400 h-10 outline-none pl-10 placeholder-gray-700 pr-3 rounded shadow-sm text-gray-500 w-full"
      @input="$emit('input', $event.target.value)"
    >
    <SearchIcon class="absolute bottom-0 inline left-0 ml-3 my-auto text-gray-700 top-0" />
  </div>
</template>

<script>
import SearchIcon from '~/components/icons/solid/SearchIcon.vue'

export default {
  components: {
    SearchIcon
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
input:focus + svg {
  @apply text-blue-200;
}
</style>
