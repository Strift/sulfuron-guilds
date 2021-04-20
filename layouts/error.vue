<template>
  <div class="flex justify-around">
    <div class="text-center my-10">
      <h1 class="text-blue-300 font-semibold" style="font-size: 8rem">
        {{ error.statusCode }}
      </h1>
      <div class="text-gray-300">
        {{ error.message }}.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head () {
    return {
      title: '404'
    }
  }
}
</script>
