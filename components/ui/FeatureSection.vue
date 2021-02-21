<template>
  <div class="md:flex md:space-x-10">
    <div class="h-12 w-12 flex-shrink-0 hidden md:inline-flex">
      <CheckCircleIcon class="text-blue-300" />
    </div>
    <div>
      <div class="flex mb-6 md:mb-4 lg:mb-2 xl:mb-1">
        <div class="h-12 w-12 flex-shrink-0 mr-4 md:hidden">
          <CheckCircleIcon class="text-blue-300" />
        </div>
        <div class="text-blue-300 text-xl md:text-2xl font-semibold text-shadow-md h-12 flex items-center">
          <slot name="title" />
        </div>
      </div>
      <div class="text-gray-300 text-shadow-sm leading-relaxed md:text-lg">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>
