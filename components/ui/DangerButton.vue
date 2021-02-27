<template>
  <button
    class="px-4 py-1 rounded-full text-center text-shadow-sm bg-opacity-25 border hover:bg-opacity-50 shadow-md hover:shadow-lg font-semibold text-xs uppercase tracking-widest bg-red-900 border-red-500 text-red-500 hover:text-red-400"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>
