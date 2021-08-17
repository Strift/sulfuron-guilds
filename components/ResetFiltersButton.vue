<template>
  <BaseSecondaryButton @click="resetClassFilters">
    Réinitialiser les filtres
  </BaseSecondaryButton>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useGuildsStore from '~/composables/useGuildsStore'

export default defineComponent({
  setup () {
    const { resetClassFilters } = useGuildsStore()
    return { resetClassFilters }
  }
})
</script>
