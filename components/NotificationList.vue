<template>
  <div class="flex px-5">
    <div
      v-if="autoSaved"
      class="flex bg-green-500 bg-opacity-75 text-green-100 rounded mx-auto space-x-4 py-2 px-5 mb-8 shadow-lg"
    >
      <div>💾</div>
      <div>Modifications sauvegardées.</div>
    </div>
    <CookieNotification v-if="showCookiesBanner" class="mb-8 mx-auto" @close="closeCookieBanner" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

const COOKIES_ENABLED_COOKIE = 'cookies_enabled'

export default {
  data: () => ({
    autoSaved: false,
    showCookiesBanner: false
  }),
  computed: {
    ...mapState(['notifications'])
  },
  watch: {
    notifications (newValue) {
      if (newValue.length > 0) {
        this.handleFirstNotification()
      }
    }
  },
  mounted () {
    const enabled = this.$cookies.get(COOKIES_ENABLED_COOKIE)

    if (!enabled) {
      this.showCookiesBanner = true
    }
  },
  methods: {
    closeCookieBanner () {
      this.showCookiesBanner = false
      this.$cookies.set(COOKIES_ENABLED_COOKIE, true)
    },
    handleFirstNotification () {
      const notification = this.notifications[0]

      if (notification.type === 'auto-saved') {
        this.autoSaved = true
        setTimeout(() => {
          this.autoSaved = false
          this.$store.commit('removeNotificationByTimestamp', notification.timestamp)
        }, 2500)
      }
    }
  }
}
</script>
