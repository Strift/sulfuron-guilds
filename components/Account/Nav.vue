<template>
  <nav class="overflow-hidden rounded-md shadow-md">
    <ul>
      <AccountNavItem v-if="isAGuildOwner" to="/compte/guilde/">
        Guilde
      </AccountNavItem>
      <AccountNavItem to="/compte/parametres/">
        Paramètres
      </AccountNavItem>
      <AccountNavItem class="items-baseline">
        Pick Up <span class="border border-gray-700 h-6 inline-flex items-center justify-center ml-auto rounded text-xs tracking-wider uppercase w-16">Soon&trade;</span>
      </AccountNavItem>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountNavItem from '~/components/AsideNavItem.vue'

export default {
  components: {
    AccountNavItem
  },
  computed: {
    ...mapGetters('account', [
      'isAGuildOwner'
    ])
  }
}
</script>
