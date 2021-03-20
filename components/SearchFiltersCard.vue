<template>
  <div class="border border-blue-300 bg-gray-900 bg-opacity-50 p-6 rounded-lg text-gray-500">
    <div class="text-xs font-bold tracking-wider uppercase text-gray-300 mb-2">
      Classes
    </div>
    <FormSpecsList
      @update="test"
    />
  </div>
</template>

<script>
import FormSpecsList from '~/components/ui/FormSpecsList.vue'

export default {
  components: {
    FormSpecsList
  },
  methods: {
    test (event) {
      console.log(event)
    }
  }
}
</script>
