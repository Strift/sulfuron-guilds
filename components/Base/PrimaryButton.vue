<template>
  <button
    class="bg-blue-900 bg-opacity-25 border border-blue-300 font-semibold hover:bg-opacity-50 hover:shadow-lg hover:text-blue-200 px-4 py-1 rounded-full shadow-md text-blue-300 text-center text-shadow-sm text-xs tracking-widest uppercase"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>
