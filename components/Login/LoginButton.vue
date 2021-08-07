<template>
  <a
    class="border inline-flex items-center px-4 py-2 space-x-4 text-gray-200"
    :href="`${$config.baseURL}/auth/battlenet`"
    @click="startLoading"
  >
    <BattleNetIcon class="h-8 w-8" />
    <div>Connexion</div>
  </a>
</template>

<script>
export default {
  methods: {
    startLoading () {
      this.$store.commit('account/startAuthLoading')
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
