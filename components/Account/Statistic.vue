<template>
  <div class="border-2 border-teal-500 font-semibold py-2 rounded text-center w-32">
    <div class="text-3xl text-teal-100">
      {{ value }}
    </div>
    <div class="text-teal-500">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }
}
</script>
