<template>
  <div class="group overflow-hidden relative rounded-md shadow-lg">
    <img
      src="~/static/images/phase-2-banner-600.jpg"
      alt="Blizzard Phase 2 announcement image"
    >
    <div class="absolute bg-black bg-opacity-25 inset-0 transition-background" />
    <div class="absolute left-0 pt-6 px-10 right-0 text-blue-300 text-shadow-sm to-black top-0 uppercase">
      <slot name="tag" />
    </div>
    <div class="absolute bg-gradient-to-b bottom-0 from-transparent left-0 p-10 pb-6 right-0 to-black">
      <slot name="default" />
    </div>
  </div>
</template>
