<template>
  <div class="flex items-center justify-center">
    <img
      v-if="hasSecureLogoUrl && !loadingError"
      v-lazy-load
      :src="url"
      :alt="alt"
      class="w-full"
      height="48"
      width="48"
      @error="loadingError = true"
    >
    <MissingGuildLogo v-else class="text-gray-700" />
  </div>
</template>

<script>
import MissingGuildLogo from '~/components/atoms/MissingGuildLogo.vue'

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
    hasSecureLogoUrl () {
      return this.url !== '' &&
        this.url != null &&
        this.url.startsWith('https://')
    }
  }
}
</script>
