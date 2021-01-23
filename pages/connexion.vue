<template>
  <LoginCard class="mx-auto">
    <div class="flex flex-col h-full">
      <h1 class="font-bold text-gray-900 text-4xl leading-none pb-8">
        Connectez-vous via Battle.net
      </h1>
      <p class="text-gray-700">
        La connexion est nécessaire uniquement pour administrer une guilde.
      </p>
      <div class="mt-auto text-center">
        <LoginButton class="shadow-md hover:shadow-lg mb-12" />
        <p class="text-gray-500 text-center">
          En cliquant sur Connexion, vous serez redirigé vers le site de Blizzard.
        </p>
      </div>
    </div>
  </LoginCard>
</template>

<script>
import LoginButton from '~/components/LoginButton.vue'
import LoginCard from '~/components/LoginCard.vue'

export default {
  components: {
    LoginButton,
    LoginCard
  }
}
</script>
