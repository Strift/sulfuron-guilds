<template>
  <FullPageLayout>
    <BaseContainer>
      <BaseHeader1>
        Mon compte
      </BaseHeader1>
      <div class="space-y-16 lg:space-x-24 md:flex md:space-x-16 md:space-y-0">
        <aside class="md:w-1/4">
          <AccountNav />
        </aside>
        <div class="md:w-3/4">
          <Nuxt />
        </div>
      </div>
    </BaseContainer>
  </FullPageLayout>
</template>

<script>
export default {
  middleware: ['auth', 'guild']
}
</script>
