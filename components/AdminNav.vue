<template>
  <nav class="overflow-hidden rounded-md shadow-md">
    <ul>
      <AsideNavItem to="/admin/nouvelle-guilde/">
        Nouvelle guilde
      </AsideNavItem>
      <AsideNavItem to="/admin/guildes/">
        Guildes
      </AsideNavItem>
    </ul>
  </nav>
</template>

<script>
import AsideNavItem from '~/components/AsideNavItem.vue'

export default {
  components: {
    AsideNavItem
  }
}
</script>
