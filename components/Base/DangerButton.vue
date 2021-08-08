<template>
  <button
    class="bg-opacity-25 bg-red-900 border border-red-500 font-semibold hover:bg-opacity-50 hover:shadow-lg px-4 py-1 rounded-full shadow-md text-center text-red-500 text-shadow-sm text-xs tracking-widest uppercase"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>
