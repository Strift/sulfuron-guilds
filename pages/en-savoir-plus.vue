<template>
  <div class="lg:flex lg:space-x-8 xl:space-x-20">
    <nuxt-img
      src="/images/iphone-mockup.png"
      alt="Site sur mobile"
      class="hidden lg:h-phone-lg lg:inline-flex my-auto xl:h-phone-xl"
      sizes="xl:370.33px lg:317.42px"
    />
    <div class="space-y-24">
      <h1 class="font-bold leading-snug text-4xl text-blue-100 text-center text-shadow-lg">
        Le recrutement des guildes<br> de Sulfuron <em class="italic">à jour</em>
      </h1>
      <div class="flex flex-col justify-center space-y-12">
        <FeatureSection>
          <h2 slot="title">
            Pas de fakes, pas de guildes fantômes
          </h2>
          <p>
            Notre algorithme privilégie les annonces qui sont tenues à jour 📈 au détriment de celles qui sont laissées à l'abandon. 📉<br>
            Les modérateurs du Discord se chargent quant à eux de vérifier l’identité des guildes.
          </p>
        </FeatureSection>
        <FeatureSection>
          <h2 slot="title">
            Fini le flood
          </h2>
          <p>
            Fini de scroller des centaines d’annonces pour trouver la guilde qui vous convient — utilisez simplement les filtres de recherche. 🕵️<br>
            Côté officier, plus besoin de re-poster votre annonce sur Discord toutes les 6 heures.
          </p>
        </FeatureSection>
        <FeatureSection>
          <h2 slot="title">
            Gestion simplifiée pour les GMs
          </h2>
          <p>
            Connectez-vous grâce à votre compte Battle.net. et modifiez l’état de votre recrutement en un clic. Au travail ? Pas de soucis, le site est entièrement fonctionnel sur mobile. 😉
          </p>
        </FeatureSection>
      </div>
      <div class="flex flex-col md:flex-row md:justify-center md:space-x-16 md:space-y-0 space-y-10">
        <NuxtLink
          :to="accountLinkUrl"
          class="bg-blue-900 bg-opacity-25 border border-blue-300 font-semibold hover:bg-opacity-75 hover:text-blue-200 md:mx-0 mx-auto px-4 py-2 rounded-full shadow-lg text-blue-300 text-center text-shadow-sm tracking-widest uppercase w-64"
        >
          <span v-show="isGuest">Connexion</span>
          <span v-show="isAuthenticated">Mon compte</span>
        </NuxtLink>
        <NuxtLink
          to="/"
          title="Accueil"
          class="bg-gray-700 bg-opacity-25 border border-gray-400 font-semibold hover:bg-opacity-75 hover:text-gray-200 md:mx-0 mx-auto px-4 py-2 rounded-full shadow-lg text-center text-gray-400 text-shadow-sm tracking-widest uppercase w-64"
        >
          Voir les guildes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FeatureSection from '~/components/ui/FeatureSection.vue'

export default {
  components: {
    FeatureSection
  },
  computed: {
    ...mapGetters('account', [
      'isGuest',
      'isAuthenticated',
      'isAGuildOwner'
    ]),
    accountLinkUrl () {
      if (this.isGuest) { return '/connexion/' }

      if (this.isAGuildOwner) { return '/compte/guilde/' }

      return '/compte/parametres/'
    }
  },
  mounted () {
    this.$store.commit('setPromoBackground')
  },
  head () {
    return {
      title: 'Pourquoi cette plateforme ?'
    }
  }
}
</script>

<style scoped>
@variants responsive {
  .h-phone-xl {
    height: 700px;
  }

  .h-phone-lg {
    height: 600px;
  }
}
</style>
