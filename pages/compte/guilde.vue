<template>
  <div class="space-y-10">
    <AccountPageTitle>
      Général
    </AccountPageTitle>
    <div class="flex justify-between">
      <div class="space-y-10">
        <FormInput
          name="name"
          label="Nom"
          disabled
          value="Les Croisés de Pandragon"
        />
        <FormInput
          name="logo-url"
          label="Lien du logo"
          value="https://astral.gg/logo.svg"
        />
        <FormInput
          name="type"
          label="Type de structure"
          value="Classique (JcE)"
        />
      </div>
      <div>
        <div class="font-semibold text-blue-400 block mb-4 leading-none text-shadow-sm">
          Logo
        </div>
        <div class="h-32 w-32 p-4 bg-gray-900 rounded-lg items-center justify-center flex shadow">
          <img src="~assets/images/astral.svg" alt="">
        </div>
      </div>
    </div>
    <AccountPageTitle>
      Recrutement
    </AccountPageTitle>
  </div>
</template>

<script>
import FormInput from '~/components/ui/FormInput.vue'
import AccountPageTitle from '~/components/ui/AccountPageTitle.vue'

export default {
  name: 'Guild',
  layout: 'account',
  components: {
    FormInput,
    AccountPageTitle
  }
}
</script>

<style>

</style>
