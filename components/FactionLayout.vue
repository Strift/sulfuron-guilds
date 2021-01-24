<template>
  <div class="min-h-screen flex flex-col">
    <div
      :class="{ 'alliance': isAlliance, 'horde': isHorde }"
      class="bg-faction relative flex-1 flex flex-col"
    >
      <div class="bg-gray-900 bg-opacity-75 relative flex-1 max-h-screen overflow-y-scroll flex flex-col">
        <div class="container mx-auto font-sans px-3 md:px-0 flex-1">
          <Navbar class="mb-6 md:mb-16" />
          <slot name="default" />
        </div>
        <div class="mt-12 h-24 flex-none" style="background-image: linear-gradient(180deg, rgba(26,32,44,0), rgb(26,32,44))" />
        <Footer />
      </div>
    </div>
    <NotificationList class="fixed bottom-0 w-full" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import NotificationList from '~/components/NotificationList.vue'

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  components: {
    Navbar,
    Footer,
    NotificationList
  },
  computed: {
    ...mapGetters([
      'isAlliance',
      'isHorde'
    ])
  },
  async mounted () {
    await this.handleLogin()
    this.$store.dispatch('auth/fetchGuild')
  },
  methods: {
    async handleLogin () {
      const token = this.$router.currentRoute.query[AUTH_TOKEN_QUERY]
      if (!token) {
        return
      }

      await this.$store.dispatch('auth/login', token)
      this.$router.push('/')
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
