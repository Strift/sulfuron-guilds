<template>
  <FullPageLayout :background="background">
    <Nuxt />
  </FullPageLayout>
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
