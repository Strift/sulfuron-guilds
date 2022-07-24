<template>
  <a
    class="border inline-flex items-center px-4 py-2 space-x-4 text-gray-200"
    :href="href"
    @click.prevent="onClick"
  >
    <BattleNetIcon class="h-8 w-8" />
    <div>Connexion</div>
  </a>
</template>

<script>
import BattleNetIcon from '~/components/atoms/icons/BattleNetIcon.vue'

export default {
  components: {
    BattleNetIcon
  },
  props: {
    href: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$segment.track('BNetLoginButton Clicked')
      window.location.href = this.href
    }
  }
}
</script>

<style scoped>
a {
  background-color: #005c99;
  border-color: #0e86ca;
}
</style>
