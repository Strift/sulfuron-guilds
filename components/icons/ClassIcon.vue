<template>
  <img :src="src" :alt="alt" :title="wowClass">
</template>

<script>
export default {
  props: {
    wowClass: {
      type: String,
      required: true
    }
  },
  computed: {
    src () {
      return `/images/class-icon-${this.wowClass.toLowerCase()}.png`
    },
    alt () {
      return `Icone de classe ${this.wowClass.toUpperCase()}`
    }
  }
}
</script>

<style>

</style>
