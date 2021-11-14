<template>
  <div class="flex items-center space-x-2 group">
    <nuxt-img
      src="/images/new-logo.png"
      alt="Icone WoW Sulfuron"
      height="64"
      width="64"
    />
    <span
      class="text-2xl font-light tracking-widest text-blue-200 uppercase group-hover:text-blue-300 text-shadow-sm"
      :class="{'hidden sm:inline': compact}"
    >Sulfuron</span>
  </div>
</template>

<script>
export default {
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  }
}
</script>
