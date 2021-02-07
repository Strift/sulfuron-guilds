<template>
  <FactionLayout>
    <h1 class="font-bold text-4xl text-blue-100 mb-12">
      Mon compte
    </h1>
    <div class="flex space-x-24">
      <aside class="w-1/4">
        <nav class="rounded-md overflow-hidden shadow-md">
          <ul>
            <AccountNavItem v-if="isAGuildOwner" to="/compte/guilde/">
              Guilde
            </AccountNavItem>
            <AccountNavItem to="/compte/profil/">
              Paramètres
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
import { mapGetters } from 'vuex'

export default {
  middleware: ['auth', 'guild'],
  computed: {
    ...mapGetters('account', [
      'isAGuildOwner'
    ])
  }
}
</script>
