<template>
  <nuxt-link
    v-if="to"
    v-slot="{ href, navigate, isActive }"
    :to="to"
  >
    <li
      :class="[ isActive && 'bg-blue-900 text-blue-500 border-transparent', !isActive && 'bg-gray-900 border-gray-800 border-opacity-75' ]"
      class="py-3 px-8 flex items-center bg-opacity-50 text-gray-500 text-shadow-sm border-b"
    >
      <a :href="href" @click="navigate">
        <slot name="default" />
      </a>
    </li>
  </nuxt-link>
  <li v-else class="py-3 px-8 flex items-center bg-gray-900 bg-opacity-50 text-gray-700">
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
