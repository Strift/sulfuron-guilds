<template>
  <div class="min-h-screen flex flex-col">
    <div
      :class="{ 'alliance': isAlliance, 'horde': isHorde }"
      class="bg-faction relative flex-1 flex flex-col"
    >
      <div class="bg-gray-900 bg-opacity-90 relative flex-1 max-h-screen overflow-y-scroll flex flex-col">
        <div class="container mx-auto font-sans px-5 xl:px-0 flex-1">
          <Navbar class="mb-6 md:mb-16" />
          <slot name="default" />
        </div>
        <div class="mt-6 lg:mt-12 h-12 lg:h-24 flex-none" style="background-image: linear-gradient(180deg, rgba(26,32,44,0), rgb(26,32,44))" />
        <Footer />
      </div>
    </div>
    <NotificationList class="fixed bottom-0 w-full" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

const DEFAULT_FACTION_COOKIE = 'default_faction'

export default {
  computed: {
    ...mapState(['faction']),
    ...mapGetters([
      'isAlliance',
      'isHorde'
    ])
  },
  watch: {
    faction (newFaction) {
      this.$cookies.set(DEFAULT_FACTION_COOKIE, newFaction)
    }
  },
  mounted () {
    const faction = this.$cookies.get(DEFAULT_FACTION_COOKIE)
    if (faction === null) {
      this.$cookies.set(DEFAULT_FACTION_COOKIE, this.faction)
    } else {
      this.$store.commit('setFaction', faction)
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

.bg-faction::before {
  content: "";
  filter: grayscale(100%);
  mix-blend-mode: screen;
  @apply absolute top-0 left-0 w-full h-full transition-background duration-1000 ease-in-out;
}

.alliance::before {
  background-image: url('~assets/images/alliance-background.jpg');
  @apply bg-cover;
}

.horde::before {
  background-image: url('~assets/images/horde-background.jpg');
  @apply bg-cover;
}
</style>
