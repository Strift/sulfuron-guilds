<template>
  <div class="bg-gray-300 md:flex md:items-baseline md:space-x-4 md:space-y-0 px-5 py-3 rounded shadow-lg text-gray-800">
    <div class="flex md:space-x-4 space-x-3">
      <div class="md:my-auto">
        🍪
      </div>
      <p>
        En navigant sur ce site, vous acceptez l'utilisation des cookies que nous utilisons pour améliorer votre expérience.
      </p>
    </div>
    <button
      class="block border border-gray-800 font-semibold hover:bg-gray-800 hover:text-gray-300 md:mt-0 mt-2 mx-auto rounded-full shadow-md text-gray-800 text-xs tracking-wider uppercase w-12"
      @click="$emit('close')"
    >
      Ok
    </button>
  </div>
</template>
