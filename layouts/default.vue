<template>
  <div>
    <div
      :class="{ 'alliance': isAlliance, 'horde': isHorde }"
      class="transition-background duration-1000 ease-in-out bg-cover overflow-y-auto relative min-h-screen"
    >
      <div class="bg-black bg-opacity-75 flex flex-col min-h-screen h-full text-gray-200">
        <div class="container mx-auto font-sans px-3 md:px-0">
          <Navbar class="mb-6 md:mb-12" />
          <Nuxt />
        </div>
      </div>
      <div class="h-12 md:h-24" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.75), rgb(0,0,0))" />
    </div>
    <footer class="bg-black py-12 text-gray-500">
      <div class="container mx-auto flex">
        <div>
          Réalisé par Strift. Tous droits réservés.
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapGetters([
      'isAlliance',
      'isHorde'
    ])
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

.alliance {
  background-image: url('~assets/images/alliance-background.jpg');
}

.horde {
  background-image: url('~assets/images/horde-background.jpg');
}
</style>
