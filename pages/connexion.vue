<template>
  <div class="mx-auto max-w-md flex flex-col items-center space-y-10 bg-gray-900 bg-opacity-75 p-8 rounded-lg mt-32">
    <h1 class="text-3xl text-gray-200 leading-none text-shadow-md font-light">
      Connexion via Battle.net
    </h1>
    <div class="space-y-4">
      <p class="text-gray-500 ">
        La connexion est uniquement requise pour pouvoir administrer une guilde.
      </p>
      <p class="text-gray-600">
        En cliquant sur Connexion, vous serez redirigé vers le site de Blizzard.
      </p>
    </div>
    <LoginButton class="shadow-md hover:shadow-lg" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginButton from '~/components/LoginButton.vue'

export default {
  components: {
    LoginButton
  },
  computed: {
    ...mapGetters('auth', [
      'isLoggedIn'
    ])
  }
}
</script>

<style>

</style>
