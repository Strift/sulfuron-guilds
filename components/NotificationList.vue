<template>
  <div class="flex">
    <div
      v-if="autoSaved"
      class="flex bg-green-500 bg-opacity-75 text-green-100 rounded mx-auto space-x-4 py-2 px-5 mb-8 shadow-md"
    >
      <div>💾</div>
      <div>Modifications sauvegardées.</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    autoSaved: false
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
  methods: {
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

<style>

</style>
