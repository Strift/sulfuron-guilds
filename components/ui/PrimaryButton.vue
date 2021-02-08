<template>
  <button
    class="px-4 py-1 rounded-full text-center text-shadow-sm bg-opacity-25 border hover:bg-opacity-50 shadow-md hover:shadow-lg font-semibold text-xs uppercase tracking-widest bg-blue-900 border-blue-300 text-blue-300 hover:text-blue-200"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>
