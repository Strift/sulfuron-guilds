<template>
  <div
    :class="{ 'alliance': isAlliance, 'horde': isHorde }"
    class="transition-background duration-1000 ease-in-out bg-cover h-screen overflow-y-auto relative text-gray-200"
  >
    <div class="bg-black bg-opacity-75">
      <div class="container mx-auto font-sans px-3">
        <Navbar class="" />
        <slot name="default" />
        <footer class="py-12 text-center">
          Réalisé par Strift. Tous droits réservés.
        </footer>
      </div>
    </div>
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
