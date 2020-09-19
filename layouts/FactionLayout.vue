<template>
  <div :class="{ 'alliance': alliance, 'horde': !alliance }" class="transition-background duration-300 ease-in h-screen overflow-y-auto">
    <slot name="default" />
  </div>
</template>

<script>
export default {
  props: {
    alliance: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

.alliance {
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),
              url('~assets/images/alliance-background.jpg');
  background-size: cover;
}

.horde {
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),
              url('~assets/images/horde-background.jpg');
  background-size: cover;
}
</style>
