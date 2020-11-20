<template>
  <header class="flex flex-wrap items-center py-6 md:py-8 space-y-4 md:space-y-0 space-x-12">
    <nuxt-link to="/" title="Accueil" class="mr-auto">
      <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="mx-auto md:mx-0 h-10">
    </nuxt-link>
    <LoginButton class="flex items-center mx-auto md:mr-0 md:ml-auto" />
    <!-- <BaseButton class="flex space-x-4 items-center">
      <BattleNetIcon class="h-8 w-8" />
      <div>Strift#2444</div>
    </BaseButton> -->
  </header>
</template>

<script>
import FactionButton from '~/components/FactionButton.vue'
import LoginButton from '~/components/LoginButton.vue'
import BattleNetIcon from '~/components/icons/BattleNetIcon.vue'

export default {
  components: {
    BattleNetIcon,
    LoginButton
  }
}
</script>
