<template>
  <header class="flex items-center py-12">
    <img src="~/assets/images/logo.png" alt="sulfuron.eu" title="Logo du site" class="h-12">
    <FactionButton class="ml-10" />
    <BlizzardButton class="flex items-center ml-auto">
      <BattleNetIcon class="h-8 w-8" />
      <div>Connexion</div>
    </BlizzardButton>
  </header>
</template>

<script>
import FactionButton from '~/components/FactionButton.vue'
import BlizzardButton from '~/components/ui/BlizzardButton.vue'

export default {
  components: {
    FactionButton,
    BlizzardButton
  }
}
</script>
