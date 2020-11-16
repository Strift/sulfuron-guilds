<template>
  <a class="flex py-2 px-4 border space-x-4 text-gray-200" href="/login">
    <BattleNetIcon class="h-8 w-8" />
    <div>Connexion</div>
  </a>
</template>

<script>
import BattleNetIcon from '~/components/icons/BattleNetIcon.vue'

export default {
  components: {
    BattleNetIcon
  }
}
</script>

<style scoped>
a {
  background-color: #005c99;
  border-color: #0e86ca;
}
</style>
