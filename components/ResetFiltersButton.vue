<template>
  <SecondaryButton @click="resetClassFilters">
    Réinitialiser les filtres
  </SecondaryButton>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SecondaryButton from '~/components/ui/SecondaryButton.vue'
import useGuildsStore from '~/composables/useGuildsStore'

export default defineComponent({
  components: {
    SecondaryButton
  },
  setup () {
    const { resetClassFilters } = useGuildsStore()
    return { resetClassFilters }
  }
})
</script>
