<template>
  <NavbarLink
    to="/"
    title="Accueil"
  >
    <span class="flex items-center space-x-2">
      <ArrowLeftIcon />
      <span>
        Retour au portail
      </span>
    </span>
  </NavbarLink>
</template>

<script>
import { defineComponent } from '#app'
import ArrowLeftIcon from '~/components/icons/solid/ArrowLeftIcon.vue'

export default defineComponent({
  components: { ArrowLeftIcon }
})
</script>
