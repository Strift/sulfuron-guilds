<template>
  <div :class="{ 'alliance': alliance, 'horde': !alliance }" class="background h-screen overflow-y-auto">
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

.background {
  transition: background-image 0.5s ease;
}

.background.alliance {
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),
              url('https://bnetcmsus-a.akamaihd.net/cms/blog_header/8b/8BIKZFGNMCEW1568413423399.jpg');
  background-size: cover;
}

.background.horde {
  background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),
              url('https://wow.zamimg.com/uploads/screenshots/normal/936585-orgrimmar.jpg');
  background-size: cover;
}
</style>
