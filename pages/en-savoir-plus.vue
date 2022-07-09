<template>
  <FeaturesPage />
</template>

<script>
import FeaturesPage from '~/components/templates/FeaturesPage.vue'

export default {
  layout: 'default',
  components: {
    FeaturesPage
  },
  mounted () {
    this.$store.commit('setPromoBackground')
  },
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
  }
}
</script>
