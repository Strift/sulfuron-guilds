<template>
  <FactionLayout>
    <PageTitle>
      Mon compte
    </PageTitle>
    <div class="md:flex md:space-x-16 lg:space-x-24 space-y-16 md:space-y-0">
      <aside class="md:w-1/4">
        <AccountNav />
      </aside>
      <div class="md:w-3/4">
        <Nuxt />
      </div>
    </div>
  </FactionLayout>
</template>

<script>
import AccountNav from '~/components/AccountNav.vue'
export default {
  components: { AccountNav },
  middleware: ['auth', 'guild']
}
</script>
