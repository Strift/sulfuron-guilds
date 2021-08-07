<template>
  <NuxtLink
    v-if="to"
    v-slot="{ href, navigate, isActive }"
    :to="to"
  >
    <li
      :class="[ isActive && 'bg-blue-900 text-blue-500 border-transparent', !isActive && 'bg-gray-900 border-gray-800 border-opacity-75' ]"
      class="bg-opacity-50 border-b flex hover:text-blue-500 items-center text-gray-500 text-shadow-sm"
    >
      <a :href="href" class="px-8 py-3 w-full" @click="navigate">
        <slot name="default" />
      </a>
    </li>
  </NuxtLink>
  <li v-else class="bg-gray-900 bg-opacity-50 flex items-center px-8 py-3 text-gray-700">
    <slot name="default" />
  </li>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null
    }
  }
}
</script>
