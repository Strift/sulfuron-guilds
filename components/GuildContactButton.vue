<template>
  <a
    :href="contactRedirectUrl"
    target="_blank"
    rel="noopener"
    title="Contact"
    class="bg-blue-900 bg-opacity-25 hover:bg-opacity-50 border border-blue-300 text-blue-300 hover:text-blue-200 text-shadow-sm px-4 py-2 rounded-full text-center uppercase font-semibold tracking-widest shadow-md hover:shadow-lg"
  >
    Contact
  </a>
</template>

<script>
export default {
  props: {
    guildId: {
      type: String,
      required: true
    }
  },
  computed: {
    contactRedirectUrl () {
      return `${this.$config.baseURL}/redirect/?type=contact&guild=${this.guildId}`
    }
  }
}
</script>
