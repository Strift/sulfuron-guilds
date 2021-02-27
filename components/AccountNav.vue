<template>
  <nav class="rounded-md overflow-hidden shadow-md">
    <ul>
      <AccountNavItem v-if="isAGuildOwner" to="/compte/guilde/">
        Guilde
      </AccountNavItem>
      <AccountNavItem to="/compte/parametres/">
        Paramètres
      </AccountNavItem>
      <AccountNavItem class="items-baseline">
        Pick Up <span class="text-xs uppercase tracking-wider border border-gray-700 h-6 w-16 rounded inline-flex items-center justify-center ml-auto">Soon&trade;</span>
      </AccountNavItem>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('account', [
      'isAGuildOwner'
    ])
  }
}
</script>

<style>

</style>
