<template>
  <NuxtLink
    v-slot="{ href, navigate }"
    :to="to"
    :title="title"
  >
    <li
      class="text-blue-300 hover:text-blue-200 text-shadow-sm text-lg space-x-2"
    >
      <a :href="href" @click="navigate">
        <slot name="default" />
      </a>
    </li>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
