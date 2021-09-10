<template>
  <a
    :href="contactRedirectUrl"
    target="_blank"
    rel="noopener"
    title="Contact"
    class="px-4 py-2 font-semibold tracking-widest text-center text-blue-300 uppercase bg-blue-900 bg-opacity-25 border border-blue-300 rounded-full shadow-md hover:bg-opacity-50 hover:shadow-lg hover:text-blue-200 text-shadow-sm"
  >
    <span v-if="isDiscord">Discord</span>
    <span v-else>Contact</span>
  </a>
</template>

<script>
export default {
  props: {
    guildId: {
      type: String,
      required: true
    },
    isDiscord: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contactRedirectUrl () {
      return `${this.$config.baseURL}/redirect/?type=contact&guild=${this.guildId}`
    }
  }
}
</script>
