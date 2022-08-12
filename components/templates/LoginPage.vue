<template>
  <LoginPanel />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import LoginPanel from '~/components/organisms/Login/LoginPanel.vue'

export default defineComponent({
  components: {
    LoginPanel
  }
})
</script>
