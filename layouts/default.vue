<template>
  <div class="min-h-screen flex flex-col">
    <div
      :class="{ 'alliance': isAlliance, 'horde': isHorde }"
      class="background relative flex-1 flex flex-col bg-gray-900"
    >
      <div class="bg-black bg-opacity-50 relative flex-1">
        <div class="container mx-auto font-sans px-3 md:px-0">
          <Navbar class="mb-6 md:mb-12" />
          <Nuxt />
        </div>
      </div>
      <div class="h-12 md:h-24 relative mt-auto" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.5), rgb(0,0,0))" />
    </div>
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters([
      'isAlliance',
      'isHorde'
    ])
  },
  async mounted () {
    const token = this.$router.currentRoute.query[AUTH_TOKEN_QUERY]
    if (!token) {
      // this.$store.dispatch('auth/autoLogin')
      return
    }

    await this.$store.dispatch('auth/login', token)
    this.$router.push('/')
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

.background::before {
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
