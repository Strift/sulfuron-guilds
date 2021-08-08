<template>
  <NuxtLink
    v-slot="{ href, navigate }"
    :to="to"
    :title="title"
  >
    <li
      class="hover:text-blue-400 space-x-2 text-blue-300 text-lg text-shadow-sm"
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
