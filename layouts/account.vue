<template>
  <FullPage>
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
  </FullPage>
</template>

<script>
import FullPage from '~/components/FullPage.vue'
import PageTitle from '~/components/ui/PageTitle.vue'
import AccountNav from '~/components/AccountNav.vue'

export default {
  components: {
    FullPage,
    PageTitle,
    AccountNav
  },
  middleware: ['auth', 'guild']
}
</script>
