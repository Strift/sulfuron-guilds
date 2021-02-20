<template>
  <div class="flex space-x-20">
    <img src="~/assets/images/iphone-mockup.png" alt="Site sur mobile" style="height: 700px" class="my-auto">
    <div class="space-y-24">
      <h1 class="text-blue-100 text-4xl text-center font-bold text-shadow-lg leading-snug">
        Le recrutement des guildes<br> de Sulfuron <em class="italic">à jour</em>
      </h1>
      <div class="flex flex-col justify-center space-y-12">
        <FeatureSection>
          <h2 slot="title">
            Pas de fakes, pas de guildes fantômes
          </h2>
          <p>
            Notre algorithme privilégie les annonces qui sont tenues à jour et pas uniquement les plus récentes.<br>
            Les modérateurs du Discord se chargent de vérifier l’identité des guildes.
          </p>
        </FeatureSection>
        <FeatureSection>
          <h2 slot="title">
            Fini le flood
          </h2>
          <p>
            Côté officier, plus besoin de re-poster votre annonce sur Discord toutes les 6 heures. Côté apply, fini de scroller des centaines d’annonces — utilisez les filtres de recherche.
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
      <div class="flex justify-center space-x-16">
        <nuxt-link
          :to="accountLinkUrl"
          class="bg-blue-900 bg-opacity-25 hover:bg-opacity-75 border border-blue-300 text-blue-300 hover:text-blue-200 text-shadow-sm px-4 py-2 rounded-full shadow-lg w-64 text-center uppercase font-semibold tracking-widest"
        >
          <span v-show="isGuest">Connexion</span>
          <span v-show="isAuthenticated">Mon compte</span>
        </nuxt-link>
        <nuxt-link
          to="/"
          title="Accueil"
          class="bg-gray-700 bg-opacity-25 hover:bg-opacity-75 border border-gray-400 text-gray-400 hover:text-gray-200 text-shadow-sm px-4 py-2 rounded-full shadow-lg w-64 text-center uppercase font-semibold tracking-widest"
        >
          Voir les guildes
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
