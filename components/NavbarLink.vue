<template>
  <nuxt-link
    v-slot="{ href, navigate }"
    :to="to"
  >
    <li
      class="text-blue-300 hover:text-blue-200 text-shadow-sm text-lg space-x-2"
    >
      <a :href="href" @click="navigate">
        <slot name="default" />
      </a>
    </li>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
