<template>
  <header class="flex flex-wrap items-center py-6 md:py-12 space-y-4 md:space-y-0">
    <img src="~/assets/images/logo.png" alt="sulfuron.eu" title="Logo du site" class="mx-auto md:mx-0 h-12">
    <FactionButton class="mx-auto md:mr-0 md:ml-10" />
    <LoginButton class="flex items-center mx-auto md:mr-0 md:ml-auto" />
  </header>
</template>

<script>
import FactionButton from '~/components/FactionButton.vue'
import LoginButton from '~/components/LoginButton.vue'

export default {
  components: {
    FactionButton,
    LoginButton
  }
}
</script>
