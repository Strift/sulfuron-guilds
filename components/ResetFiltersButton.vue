<template>
  <PrimaryButton
    @click="resetFilters"
  >
    Réinitialiser
  </PrimaryButton>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import PrimaryButton from '~/components/ui/PrimaryButton.vue'
import useClassFilters from '~/composables/useClassFilters'

export default defineComponent({
  components: {
    PrimaryButton
  },
  setup () {
    const store = useStore()
    const { filters, setAllFilters } = useClassFilters()

    const resetFilters = () => {
      setAllFilters(false)
      store.commit('guilds/setClassFilters', cloneDeep(filters.value))
    }
    return {
      resetFilters
    }
  }
})
</script>
