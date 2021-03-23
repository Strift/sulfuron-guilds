<template>
  <div class="relative shadow-md">
    <input
      id="search-bar"
      name="search"
      type="text"
      placeholder="Nyk Trib..."
      :value="value"
      class="focus:border-blue-300 focus:border-opacity-75 focus:text-gray-400 focus:shadow bg-blue-900 bg-opacity-25 border border-gray-700 text-gray-500 placeholder-gray-700 h-10 rounded pl-10 pr-3 outline-none shadow-sm block w-full"
      @input="$emit('input', $event.target.value)"
    >
    <SearchIcon class="inline absolute left-0 bottom-0 top-0 my-auto ml-3 text-gray-700" />
  </div>
</template>

<script>
export default {
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
