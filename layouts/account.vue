<template>
  <FullPageLayout>
    <BaseHeader1>
      Mon compte
    </BaseHeader1>
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
export default {
  middleware: ['auth', 'guild']
}
</script>
