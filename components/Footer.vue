<template>
  <footer class="bg-gray-900 py-20 text-gray-300 space-y-12">
    <div class="container mx-auto md:flex px-5 xl:px-0 space-y-12 md:space-y-0">
      <div class="md:w-1/2">
        <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="h-10">
      </div>
      <div class="md:w-1/2 md:flex justify-end md:space-x-32 lg:space-x-48 xl:space-x-64 items-baseline space-y-12 md:space-y-0">
        <div>
          <div class="font-semibold text-lg mb-6 md:mb-10">
            Sulfuron
          </div>
          <ul class="space-y-5 text-gray-500">
            <li>
              <nuxt-link to="/" class="hover:text-blue-300">
                Guildes
              </nuxt-link>
            </li>
            <li><a href="http://sulfuron.eu" target="_blank" class="hover:text-blue-300">Actualités</a></li>
          </ul>
        </div>
        <div>
          <div class="font-semibold text-lg mb-6 md:mb-10">
            Contact
          </div>
          <ul class="space-y-5 text-gray-500">
            <li><a href="https://discord.gg/M5Dxe4dMsK" target="_blank" class="hover:text-blue-300">Discord</a></li>
            <li><a href="https://twitter.com/EuSulfuron" target="_blank" class="hover:text-blue-300">Twitter</a></li>
            <li><a href="mailto:contact@sulfuron.eu" target="_blank" class="hover:text-blue-300">E-mail</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container mx-auto text-center text-gray-700">
      Réalisé par Strift. Tous droits réservés.
    </div>
  </footer>
</template>
