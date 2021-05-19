<template>
  <div class="flex px-5">
    <div
      v-if="autoSaved"
      class="bg-green-500 bg-opacity-75 flex mb-8 mx-auto px-5 py-2 rounded shadow-lg space-x-4 text-green-100"
    >
      <div>💾</div>
      <div>Modifications sauvegardées.</div>
    </div>
    <CookieNotification v-if="showCookiesBanner" class="mb-8 mx-auto" @close="closeCookieBanner" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CookieNotification from '~/components/CookieNotification.vue'

const COOKIES_ENABLED_COOKIE = 'cookies_enabled'

export default {
  components: {
    CookieNotification
  },
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
