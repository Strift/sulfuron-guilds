<template>
  <button
    class="px-4 py-2 rounded-full text-center text-shadow-sm bg-opacity-25 border hover:bg-opacity-50 shadow-md hover:shadow-lg bg-blue-900 border-gray-500 text-gray-500 hover:text-blue-200 flex space-x-2 items-center"
    @click="$emit('click')"
  >
    <FilterIcon />
    <span class="hidden sm:inline">Filtres</span>
  </button>
</template>
