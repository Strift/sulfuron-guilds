<template>
  <div class="md:flex md:items-baseline md:space-x-4 md:space-y-0 bg-gray-300 text-gray-800 rounded py-3 px-5 shadow-lg ">
    <div class="flex space-x-3 md:space-x-4">
      <div class="md:my-auto">
        🍪
      </div>
      <p>
        En navigant sur ce site, vous acceptez l'utilisation des cookies que nous utilisons pour améliorer votre expérience.
      </p>
    </div>
    <button
      class="font-semibold text-gray-800 rounded-full border border-gray-800 w-12 uppercase tracking-wider text-xs hover:bg-gray-800 hover:text-gray-300 shadow-md mx-auto block mt-2 md:mt-0"
      @click="$emit('close')"
    >
      Ok
    </button>
  </div>
</template>
