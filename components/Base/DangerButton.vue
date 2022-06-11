<template>
  <button
    class="px-4 py-1 text-xs font-semibold tracking-widest text-center text-red-500 uppercase bg-red-900 bg-opacity-25 border border-red-500 rounded-full shadow-md hover:bg-opacity-50 hover:shadow-lg text-shadow-sm"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>
