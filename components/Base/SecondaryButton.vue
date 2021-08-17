<template>
  <button
    class="focus:outline-none font-semibold text-blue-300 text-center text-shadow-sm text-xs tracking-widest uppercase"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>
