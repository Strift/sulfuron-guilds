<template>
  <footer class="bg-gray-900 py-20 space-y-12 text-gray-300">
    <div class="container md:flex md:space-y-0 mx-auto px-5 space-y-12 xl:px-0">
      <div class="md:w-1/2">
        <nuxt-img src="/images/logo.png" alt="sulfuron.eu" class="h-10" />
      </div>
      <div class="items-baseline justify-end lg:space-x-48 md:flex md:space-x-32 md:space-y-0 md:w-1/2 space-y-12 xl:space-x-64">
        <div>
          <div class="font-semibold mb-6 md:mb-10 text-lg">
            Sulfuron
          </div>
          <ul class="space-y-5 text-gray-500">
            <li>
              <NuxtLink to="/" class="hover:text-blue-300">
                Guildes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/en-savoir-plus/" class="hover:text-blue-300">
                En savoir plus
              </NuxtLink>
            </li>
            <li><a href="http://sulfuron.eu" target="_blank" rel="noopener" class="hover:text-blue-300">Actualités</a></li>
          </ul>
        </div>
        <div v-if="$config.features.ENABLE_PARTNERS">
          <div class="font-semibold mb-6 md:mb-10 text-lg">
            Partenaires
          </div>
          <ul class="space-y-5 text-gray-500">
            <li><a href="http://www.tbcfrance.com/" target="_blank" rel="noopener" class="hover:text-blue-300">TBC France</a></li>
          </ul>
        </div>
        <div>
          <div class="font-semibold mb-6 md:mb-10 text-lg">
            Contact
          </div>
          <ul class="space-y-5 text-gray-500">
            <li><a href="https://discord.gg/M5Dxe4dMsK" target="_blank" rel="noopener" class="hover:text-blue-300">Discord</a></li>
            <li><a href="https://twitter.com/EuSulfuron" target="_blank" rel="noopener" class="hover:text-blue-300">Twitter</a></li>
            <li><a href="mailto:contact@sulfuron.eu" target="_blank" rel="noopener" class="hover:text-blue-300">E-mail</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container mx-auto text-center text-gray-700">
      Réalisé par Strift. Tous droits réservés.
    </div>
  </footer>
</template>
