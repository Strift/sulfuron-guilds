<template>
  <div class="md:flex md:space-x-10">
    <div class="flex-shrink-0 h-12 hidden md:inline-flex w-12">
      <CheckCircleIcon class="text-blue-300" />
    </div>
    <div>
      <div class="flex lg:mb-2 mb-6 md:mb-4 xl:mb-1">
        <div class="flex-shrink-0 h-12 md:hidden mr-4 w-12">
          <CheckCircleIcon class="text-blue-300" />
        </div>
        <div class="flex font-semibold h-12 items-center md:text-2xl text-blue-300 text-shadow-md text-xl">
          <slot name="title" />
        </div>
      </div>
      <div class="leading-relaxed md:text-lg text-gray-300 text-shadow-sm">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import CheckCircleIcon from '~/components/icons/outline/CheckCircleIcon.vue'

export default defineComponent({
  components: {
    CheckCircleIcon
  }
})
</script>
