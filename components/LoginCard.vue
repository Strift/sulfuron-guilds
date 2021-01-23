<template>
  <div class="max-w-screen-md h-pane relative flex rounded-2xl overflow-hidden">
    <div class="w-1/3 bg-gray-900">
      <img src="~assets/images/illidan.png" alt="" class="flip-x absolute h-pane">
    </div>
    <div class="w-2/3 bg-gray-300 pt-20 pl-32 pr-20 pb-8">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>
.w-left-pane {
  width: 256px;
}

.w-right-pane {
  width: 384px;
}

.flip-x {
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

.h-pane {
  height: 542px
}
</style>
