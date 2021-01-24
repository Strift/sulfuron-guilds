<template>
  <FactionLayout>
    <h1 class="font-bold text-4xl text-blue-100 mb-12">
      Mon compte
    </h1>
    <div class="flex space-x-24">
      <aside class="w-1/4">
        <nav class="rounded-md overflow-hidden shadow-md">
          <ul>
            <AccountNavItem to="/compte/profil/">
              Profil
            </AccountNavItem>
            <AccountNavItem to="/compte/guilde/">
              Guilde
            </AccountNavItem>
            <AccountNavItem class="items-baseline">
              Pick Up <span class="text-xs uppercase tracking-wider border border-gray-700 h-6 w-16 rounded inline-flex items-center justify-center ml-auto">Soon&trade;</span>
            </AccountNavItem>
          </ul>
        </nav>
      </aside>
      <div class="w-3/4">
        <Nuxt />
      </div>
    </div>
  </FactionLayout>
</template>

<script>
import AccountNavItem from '~/components/AccountNavItem.vue'
import FactionLayout from '~/components/FactionLayout.vue'

export default {
  components: {
    FactionLayout,
    AccountNavItem
  }
}
</script>
