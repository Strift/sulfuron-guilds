<template>
  <FullPageLayout>
    <PageTitle>
      Admin zone 👀
    </PageTitle>
    <div class="lg:space-x-24 md:flex md:space-x-16 md:space-y-0 space-y-16">
      <aside class="md:w-1/4">
        <AdminNav />
      </aside>
      <div class="md:w-3/4">
        <Nuxt />
      </div>
    </div>
  </FullPageLayout>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle.vue'
import AdminNav from '~/components/AdminNav.vue'

export default {
  components: {
    PageTitle,
    AdminNav
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
