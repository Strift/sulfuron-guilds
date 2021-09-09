<template>
  <div class="text-center text-gray-500">
    {{ orderedResults.length }} {{ resultsText }} trouvées.
  </div>
</template>

<script>
import { computed } from 'vue-demi'
import useSearchStore from '~/composables/useSearchStore'
export default {
  setup () {
    const { orderedResults } = useSearchStore()
    const resultsText = computed(() => orderedResults.length > 1 ? 'guildes' : 'guilde')
    return {
      orderedResults,
      resultsText
    }
  }
}
</script>
