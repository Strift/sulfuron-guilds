<template>
  <div class="text-center text-gray-500">
    {{ orderedResults.length }} {{ resultsText }}.
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import useSearchStore from '~/composables/useSearchStore'
export default {
  setup () {
    const { orderedResults } = useSearchStore()
    const resultsText = computed(() => {
      return orderedResults.value.length === 1
        ? 'guilde trouvée'
        : 'guildes trouvées'
    })
    return {
      orderedResults,
      resultsText
    }
  }
}
</script>
