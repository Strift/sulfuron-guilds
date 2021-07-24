<template>
  <button
    class="focus:outline-none focus:text-blue-300 font-semibold hover:text-blue-300 text-gray-500 text-sm tracking-wide uppercase"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>
