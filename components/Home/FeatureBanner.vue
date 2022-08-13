<template>
  <HomeBanner>
    <template slot="tag">
      Nouveauté
    </template>
    <div class="flex items-center">
      <div>
        <p class="hidden mb-1 text-2xl text-gray-100 sm:block text-shadow-sm">
          Trouvez la meilleure guilde pour préparer Wrath of the Lich King Classic.
        </p>
        <div class="font-semibold text-blue-300 sm:text-lg">
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
  </HomeBanner>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import HomeBanner from '~/components/Home/Banner.vue'
import BellIcon from '~/components/atoms/icons/solid/BellIcon.vue'

export default defineComponent({
  components: {
    HomeBanner,
    BellIcon
  }
})
</script>
