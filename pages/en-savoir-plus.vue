<template>
  <FeaturesPage />
</template>

<script>
import FeaturesPage from '~/components/templates/FeaturesPage.vue'

export default {
  components: {
    FeaturesPage
  },
  layout: 'default',
  head () {
    return {
      title: 'Pourquoi cette plateforme ? - Sulfuron-EU',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Retrouvez l'état du recrutement des guildes de Sulfuron-EU à jour. Trouvez et rejoignez la guilde qui recherche votre classe sur The Burning Crusade Classic."
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setPromoBackground')
  }
}
</script>
