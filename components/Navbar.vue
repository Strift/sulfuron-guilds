<template>
  <header class="flex flex-col md:flex-row items-center md:justify-between space-y-8 md:space-y-0 h-24">
    <nuxt-link to="/" title="Accueil">
      <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="mx-auto md:mx-0 h-10">
    </nuxt-link>
    <div v-show="user" class="flex space-x-4 items-center ">
      <BattleNetIcon class="h-8 w-8" />
      <div class="font-semibold">
        {{ username }}
      </div>
    </div>
    <LoginButton v-show="!user" class="shadow-lg" />
  </header>
</template>

<script>
import { mapState } from 'vuex'
import LoginButton from '~/components/LoginButton.vue'
import BattleNetIcon from '~/components/icons/BattleNetIcon.vue'

export default {
  components: {
    BattleNetIcon,
    LoginButton
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    username () {
      return this.user ? this.user.name : 'Username'
    }
  }
}
</script>
