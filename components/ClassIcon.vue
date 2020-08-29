<template>
  <img :src="src" :alt="alt" :title="className">
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: true
    }
  },
  computed: {
    src () {
      return `/images/class-icon-${this.className.toLowerCase()}.png`
    },
    alt () {
      return `${this.className.toUpperCase()} class icon`
    }
  }
}
</script>

<style>

</style>
