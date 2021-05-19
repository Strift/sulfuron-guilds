<template>
  <div class="flex flex-col justify-center">
    <div class="ml-auto">
      <button
        v-if="upToDate"
        class="bg-green-900 bg-opacity-25 border border-green-300 cursor-not-allowed flex font-semibold items-center px-6 py-2 rounded-full shadow-md space-x-2 text-center text-green-300 text-shadow-sm tracking-widest uppercase"
        disabled
      >
        <CheckIcon />
        <span>
          À jour
        </span>
      </button>
      <button v-else class="bg-opacity-25 bg-yellow-900 border border-yellow-300 font-semibold hover:bg-opacity-50 hover:shadow-lg hover:text-yellow-200 px-6 py-2 rounded-full shadow-md text-center text-shadow-sm text-yellow-300 tracking-widest uppercase">
        Rafraîchir
      </button>
    </div>
    <div class="mt-4 text-gray-600 text-right">
      <span v-if="upToDate">Merci de la part de vos futurs applys !</span>
      <span v-else>Gardez votre annonce à jour pour qu'elle ne disparaisse pas.</span>
    </div>
  </div>
</template>

<script>
import CheckIcon from '~/components/icons/solid/CheckIcon.vue'

export default {
  components: { CheckIcon },
  props: {
    upToDate: {
      type: Boolean,
      required: true
    }
  }
}
</script>
