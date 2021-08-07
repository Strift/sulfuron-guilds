<template>
  <div class="flex h-pane md:max-w-screen-md overflow-hidden relative rounded-2xl">
    <div class="bg-gray-900 hidden md:inline-flex md:w-1/3">
      <nuxt-img src="/images/illidan.png" alt="Illidan Stormrage" class="absolute flip-x h-pane" height="542" width="371" />
    </div>
    <div class="bg-gray-300 md:pb-8 md:pl-32 md:pr-20 md:pt-20 md:w-2/3 p-8">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>
.flip-x {
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

.h-pane {
  height: 542px
}
</style>
