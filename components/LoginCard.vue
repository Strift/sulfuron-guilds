<template>
  <div class="md:max-w-screen-md h-pane relative flex rounded-2xl overflow-hidden">
    <div class="hidden md:inline-flex md:w-1/3 bg-gray-900">
      <img src="~assets/images/illidan.png" alt="" class="flip-x absolute h-pane">
    </div>
    <div class="md:w-2/3 bg-gray-300 md:pt-20 md:pl-32 md:pr-20 md:pb-8 p-8">
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
