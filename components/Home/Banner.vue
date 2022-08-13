<template>
  <div class="relative overflow-hidden rounded-md shadow-lg group">
    <img
      style="aspect-ratio: 1920/600;"
      src="~/static/images/lk-banner.jpg"
      alt="Blizzard annonce Wrath of the Lich King Classic"
    >
    <div class="absolute inset-0 bg-black bg-opacity-10 transition-background" />
    <div class="absolute top-0 left-0 right-0 px-5 pt-5 font-semibold tracking-wide text-yellow-500 uppercase sm:px-10 sm:pt-6 text-shadow-sm to-black">
      <slot name="tag" />
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-5 sm:px-10 sm:pb-6 bg-gradient-to-b from-transparent to-black">
      <slot name="default" />
    </div>
  </div>
</template>
