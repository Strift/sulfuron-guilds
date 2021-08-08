<template>
  <div>
    <h1 class="font-semibold leading-none mb-8 text-4xl text-blue-100 text-shadow-lg">
      Portail des guildes
    </h1>
    <!-- <p class="mb-12 text-gray-400 text-lg text-shadow-md">
      Rejoignez une guilde WoW Classic sur le serveur <span class="italic">The Burning Crusade</span> Sulfuron.
      <NuxtLink to="/en-savoir-plus/" class="font-semibold hover:text-blue-400 text-blue-300">
        En savoir plus.
      </NuxtLink>
    </p> -->
    <div class="overflow-hidden relative rounded-md shadow-lg">
      <img
        src="~/static/images/phase-2-banner-600.jpg"
        alt="Blizzard Phase 2 announcement image"
      >
      <div class="absolute bg-gradient-to-b bottom-0 flex from-transparent items-center left-0 p-10 pb-6 right-0 to-black">
        <div>
          <p class="mb-1 text-gray-100 text-lg text-shadow-md text-shadow-sm">
            Trouvez votre guilde et préparez-vous à affronter Vashj et Kael'Thas !
          </p>
          <div class="font-semibold text-blue-300">
            Phase 2 : Les Seigneurs de l'Outreterre
          </div>
        </div>
        <NuxtLink
          to="/en-savoir-plus/"
          class="bg-blue-900 bg-opacity-25 border border-blue-300 font-semibold hover:bg-opacity-75 hover:text-blue-200 ml-auto px-4 py-2 rounded-full shadow-lg text-blue-300 text-center text-shadow-sm tracking-widest uppercase w-64"
        >
          En savoir plus
        </NuxtLink>
        <!-- <NuxtLink to="/en-savoir-plus/" class="bg-blue-900 bg-opacity-25 border border-blue-300 hover:bg-opacity-50 hover:shadow-lg hover:text-blue-400 ml-auto px-4 py-1 rounded-full shadow-md text-blue-300 text-center text-lg text-shadow-sm">
          En savoir plus
        </NuxtLink> -->
        <!-- <button class="bg-opacity-50 bg-yellow-900 border border-yellow-400 hover:bg-opacity-75 hover:shadow-lg hover:text-yellow-500 ml-auto px-5 py-1 rounded-full shadow-md text-center text-lg text-shadow-sm text-yellow-300">
          En savoir plus
        </button> -->
      </div>
    </div>
  </div>
</template>
