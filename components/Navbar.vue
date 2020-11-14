<template>
  <header class="flex flex-wrap items-center py-6 md:py-12 space-y-4 md:space-y-0">
    <img src="~/assets/images/logo.png" alt="sulfuron.eu" title="Logo du site" class="mx-auto md:mx-0 h-12">
    <FactionButton class="mx-auto md:mr-0 md:ml-10" />
    <BlizzardButton class="flex items-center mx-auto md:mr-0 md:ml-auto">
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
