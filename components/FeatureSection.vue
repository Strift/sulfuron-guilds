<template>
  <div class="flex space-x-10">
    <div class="h-12 w-12 flex-shrink-0">
      <CheckCircleIcon class="text-blue-300" />
    </div>
    <div>
      <div class="text-blue-300 text-2xl font-semibold h-12 items-center flex text-shadow-md">
        <slot name="title" />
      </div>
      <div class="text-gray-300 text-lg text-shadow-sm">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>

</style>
