<template>
  <div>
    <h1 class="font-semibold leading-none mb-4 text-4xl text-blue-100 text-shadow-lg">
      Portail des guildes
    </h1>
    <p class="mb-12 text-gray-500 text-lg text-shadow-md">
      Trouvez votre guilde sur Sulfuron.
      <NuxtLink to="/en-savoir-plus/" class="hover:text-blue-500 text-blue-400">
        En savoir plus.
      </NuxtLink>
    </p>
    <HomeBanner>
      <template slot="tag">
        Nouveauté
      </template>
      <div class="flex items-center">
        <div>
          <p class="mb-1 text-gray-100 text-shadow-sm text-shadow-sm text-xl">
            Rejoignez une guilde et préparez-vous à affronter Vashj et Kael'Thas !
          </p>
          <div class="font-semibold text-blue-300">
            Soyez notifiés lorsqu'une guilde recrute votre classe.
          </div>
        </div>
        <!-- <NuxtLink
          to="/en-savoir-plus/"
          class="bg-blue-900 bg-opacity-25 border border-blue-300 font-semibold hover:bg-opacity-75 hover:text-blue-200 ml-auto px-4 py-2 rounded-full shadow-lg text-blue-300 text-center text-shadow-sm tracking-widest uppercase w-64"
        >
          En savoir plus
        </NuxtLink> -->
        <NuxtLink
          to="/en-savoir-plus/"
          class="bg-opacity-50 bg-yellow-900 border border-yellow-400 font-semibold hover:bg-opacity-75 hover:shadow-lg hover:text-yellow-500 ml-auto px-5 py-1 rounded-full shadow-md text-center text-lg text-shadow-sm text-yellow-300 tracking-widest uppercase w-64"
        >
          Activer
        </NuxtLink>
      <!-- <button class="bg-opacity-50 bg-yellow-900 border border-yellow-400 hover:bg-opacity-75 hover:shadow-lg hover:text-yellow-500 ml-auto px-5 py-1 rounded-full shadow-md text-center text-lg text-shadow-sm text-yellow-300">
          En savoir plus
        </button> -->
      </div>
    </HomeBanner>
  </div>
</template>
