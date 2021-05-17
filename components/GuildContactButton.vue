<template>
  <a
    :href="contactRedirectUrl"
    target="_blank"
    rel="noopener"
    title="Contact"
    class="bg-blue-900 bg-opacity-25 border border-blue-300 font-semibold hover:bg-opacity-50 hover:shadow-lg hover:text-blue-200 px-4 py-2 rounded-full shadow-md text-blue-300 text-center text-shadow-sm tracking-widest uppercase"
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
