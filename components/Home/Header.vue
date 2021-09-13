<template>
  <div>
    <h1 class="mb-4 text-4xl font-semibold leading-none text-blue-100 text-shadow-lg">
      Portail des guildes
    </h1>
    <p class="mb-12 text-lg text-gray-500 text-shadow-md">
      Trouvez votre guilde sur Sulfuron.
      <NuxtLink to="/en-savoir-plus/" class="text-blue-400 hover:text-blue-500">
        En savoir plus.
      </NuxtLink>
    </p>
    <!-- <HomeBanner>
      <template slot="tag">
        Nouveauté
      </template>
      <div class="flex items-center">
        <div>
          <p class="mb-1 text-xl text-gray-100 text-shadow-sm">
            Rejoignez une guilde et préparez-vous à affronter Vashj et Kael'Thas !
          </p>
          <div class="font-semibold text-blue-300">
            Soyez notifiés lorsqu'une guilde recrute votre classe.
          </div>
        </div>
        <NuxtLink
          to="/en-savoir-plus/"
          class="w-64 px-5 py-1 ml-auto text-lg font-semibold tracking-widest text-yellow-300 uppercase bg-yellow-900 bg-opacity-50 border border-yellow-400 rounded-full shadow-md hover:bg-opacity-75 hover:shadow-lg hover:text-yellow-500 text-shadow-sm"
        >
          <span class="flex items-center justify-center space-x-2">
            <BellIcon height="24" width="24" />
            <span>Activer
            </span>
          </span>
        </NuxtLink>
      </div>
    </HomeBanner> -->
  </div>
</template>

<script>
import BellIcon from '~/components/icons/solid/BellIcon.vue'

export default {
  components: {
    BellIcon
  }
}
</script>
