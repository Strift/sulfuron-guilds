<script>
import Logo from '~/components/atoms/Logo.vue'

export default {
  components: { Logo }
}
</script>

<template>
  <footer class="py-20 space-y-12 text-gray-300 bg-gray-900">
    <div class="container px-5 mx-auto space-y-12 md:flex md:space-y-0 xl:px-0">
      <div class="md:w-1/2">
        <Logo />
      </div>
      <div class="items-baseline justify-end space-y-12 lg:space-x-48 md:flex md:space-x-32 md:space-y-0 md:w-1/2 xl:space-x-64">
        <div>
          <div class="mb-6 text-lg font-semibold md:mb-10">
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
          <div class="mb-6 text-lg font-semibold md:mb-10">
            Partenaires
          </div>
          <ul class="space-y-5 text-gray-500">
            <li><a href="http://www.tbcfrance.com/" target="_blank" rel="noopener" class="hover:text-blue-300">TBC France</a></li>
          </ul>
        </div>
        <div>
          <div class="mb-6 text-lg font-semibold md:mb-10">
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
