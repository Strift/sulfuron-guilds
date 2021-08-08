<template>
  <div class="flex group items-center space-x-2">
    <nuxt-img
      src="/images/new-logo.png"
      alt="Icone WoW Sulfuron"
      height="64"
      width="64"
    />
    <span
      class="font-light group-hover:text-blue-300 text-2xl text-blue-200 text-shadow-sm tracking-widest uppercase"
      :class="{'hidden sm:inline': navbar}"
    >Sulfuron</span>
  </div>
</template>

<script>
export default {
  props: {
    navbar: {
      type: Boolean,
      default: false
    }
  }
}
</script>
