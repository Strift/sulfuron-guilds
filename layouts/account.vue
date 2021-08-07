<template>
  <FullPageLayout>
    <PageTitle>
      Mon compte
    </PageTitle>
    <div class="lg:space-x-24 md:flex md:space-x-16 md:space-y-0 space-y-16">
      <aside class="md:w-1/4">
        <AccountNav />
      </aside>
      <div class="md:w-3/4">
        <Nuxt />
      </div>
    </div>
  </FullPageLayout>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle.vue'

export default {
  components: {
    PageTitle
  },
  middleware: ['auth', 'guild']
}
</script>
