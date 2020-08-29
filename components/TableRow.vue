<template>
  <div class="bg-gray-800 flex px-4 py-2 text-gray-400">
    <div class="w-1/4 mr-6">
      {{ name }}
    </div>
    <div class="w-32 mr-6">
      {{ type }}
    </div>
    <div class="w-32 mr-6">
      {{ playtime }}
    </div>
    <div class="w-1/4 mr-auto space-x-2">
      <ClassIcon
        v-for="(className, i) in recruitment"
        :key="i"
        :class-name="className"
        class="inline h-6"
      />
    </div>
    <div class="w-24 ml-6">
      {{ support }}
    </div>
    <div class="w-24 ml-6">
      {{ activity }} 🔥
    </div>
  </div>
</template>

<script>
import ClassIcon from '~/components/ClassIcon.vue'

export default {
  components: {
    ClassIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    playtime: {
      type: String,
      required: true
    },
    recruitment: {
      type: Array,
      required: true
    },
    support: {
      type: Number,
      required: true
    },
    activity: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>

</style>
