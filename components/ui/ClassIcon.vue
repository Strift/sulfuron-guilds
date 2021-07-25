<template>
  <nuxt-img :src="src" :alt="alt" :title="imageTitle" height="24" width="24" />
</template>

<script>
import WOW_CLASSES from '~/data/classes.json'

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
    },
    imageTitle () {
      const { name } = WOW_CLASSES.find(({ value }) => value === this.wowClass)
      return name
    }
  }
}
</script>

<style>

</style>
