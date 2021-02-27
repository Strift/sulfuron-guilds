<template>
  <FullPage :background="background">
    <Nuxt />
  </FullPage>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapState(['background'])
  }
}
</script>
