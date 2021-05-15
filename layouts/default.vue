<template>
  <FullPage :background="background">
    <Nuxt />
  </FullPage>
</template>

<script>
import { mapState } from 'vuex'
import FullPage from '~/components/FullPage.vue'

export default {
  name: 'DefaultLayout',
  components: {
    FullPage
  },
  computed: {
    ...mapState(['background'])
  }
}
</script>
