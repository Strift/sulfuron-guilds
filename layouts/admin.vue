<template>
  <FullPageLayout>
    <BaseContainer>
      <BaseHeader1>
        Admin zone 👀
      </BaseHeader1>
      <div class="space-y-16 lg:space-x-24 md:flex md:space-x-16 md:space-y-0">
        <aside class="md:w-1/4">
          <AdminNav />
        </aside>
        <div class="md:w-3/4">
          <Nuxt />
        </div>
      </div>
    </BaseContainer>
  </FullPageLayout>
</template>

<script>
import BaseContainer from '~/components/atoms/BaseContainer.vue'

export default {
  components: {
    BaseContainer
  },
  middleware: ['auth', 'admin'],
  data: () => ({
    account: '',
    error: null
  }),
  async mounted () {
    await this.$store.dispatch('admin/fetchGuilds')
    // Performing data fetching in mounted hook because of NuxtFirebase issues with SSR
    // await this.$store.dispatch('admin/enableGuildsSync')
  },
  async beforeDestroy () {
    // await this.$store.dispatch('admin/disableGuildsSync')
  }
}
</script>
