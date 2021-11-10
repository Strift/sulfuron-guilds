<template>
  <BaseSecondaryButton @click="resetClassFilters">
    Réinitialiser les filtres
  </BaseSecondaryButton>
</template>

<script>
import { defineComponent } from '#app'
import useGuildsStore from '~/composables/useGuildsStore'

export default defineComponent({
  setup () {
    const { resetClassFilters } = useGuildsStore()
    return { resetClassFilters }
  }
})
</script>
