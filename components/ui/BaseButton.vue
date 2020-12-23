<template>
  <button
    class="px-4 py-1 rounded-full text-center text-shadow-sm bg-opacity-25 border hover:bg-opacity-50 shadow-md hover:shadow-lg font-semibold text-xs uppercase tracking-widest"
    :class="colorClasses"
    @click="$emit('click')"
  >
    <slot name="default" />
  </button>
</template>

<script>
import theme from 'tailwindcss/defaultTheme'

export default {
  props: {
    color: {
      required: true,
      validator: color => Object.keys(theme.colors).includes(color)
    }
  },
  computed: {
    colorClasses () {
      return `bg-${this.color}-900 border-${this.color}-500 text-${this.color}-500 hover:text-${this.color}-400`
    }
  }
}
</script>
