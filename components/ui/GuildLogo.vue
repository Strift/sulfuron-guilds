<template>
  <div class="flex items-center justify-center">
    <img
      v-if="hasLogo && !loadingError"
      v-lazy-load
      :src="url"
      :alt="alt"
      class="w-full"
      @error="loadingError = true"
    >
    <MissingGuildLogo v-else class="text-gray-700" />
  </div>
</template>

<script>
import MissingGuildLogo from '~/components/ui/MissingGuildLogo.vue'

export default {
  components: {
    MissingGuildLogo
  },
  props: {
    alt: { type: String, required: true },
    url: { type: String, required: true }
  },
  data: () => ({
    loadingError: false
  }),
  computed: {
    hasLogo () {
      return this.url !== '' &&
        this.url != null
    }
  }
}
</script>
