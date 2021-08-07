<template>
  <BaseSelect
    v-model="type"
    :options="options"
    name="type"
    label="Type de structure"
    placeholder="Sélectionnez le type de guilde"
  />
</template>

<script>
import { debounce } from 'lodash'
import GUILD_TYPES from '~/data/guildTypes.json'

export default {
  data: () => ({
    options: GUILD_TYPES
  }),
  computed: {
    type: {
      get () {
        return this.$store.state.account.guild.type
      },
      set: debounce(function (value) {
        this.$store.dispatch('account/updateGuild', { type: value })
      }, 1000)
    }
  }
}
</script>
