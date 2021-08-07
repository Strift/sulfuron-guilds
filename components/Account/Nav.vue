<template>
  <nav class="overflow-hidden rounded-md shadow-md">
    <ul>
      <BaseSideNavItem v-if="isAGuildOwner" to="/compte/guilde/">
        Guilde
      </BaseSideNavItem>
      <BaseSideNavItem to="/compte/parametres/">
        Paramètres
      </BaseSideNavItem>
      <BaseSideNavItem class="items-baseline">
        Pick Up <span class="border border-gray-700 h-6 inline-flex items-center justify-center ml-auto rounded text-xs tracking-wider uppercase w-16">Soon&trade;</span>
      </BaseSideNavItem>
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
