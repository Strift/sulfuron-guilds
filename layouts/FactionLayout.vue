<template>
  <div
    :class="{ 'alliance': isAlliance, 'horde': isHorde }"
    class="transition-background duration-1000 ease-in-out bg-cover h-screen overflow-y-auto relative"
  >
    <div class="absolute inset-0 bg-black bg-opacity-75">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isAlliance',
      'isHorde'
    ])
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

.alliance {
  background-image: url('~assets/images/alliance-background.jpg');
}

.horde {
  background-image: url('~assets/images/horde-background.jpg');
}
</style>
