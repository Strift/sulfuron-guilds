<template>
  <FormSelect
    v-model="type"
    :options="options"
    name="type"
    label="Type de structure"
    placeholder="Sélectionnez le type de guilde"
  />
</template>

<script>
import { debounce } from 'lodash'
import FormSelect from '~/components/ui/FormSelect.vue'
import GUILD_TYPES from '~/data/guildTypes.json'

export default {
  components: {
    FormSelect
  },
  data: () => ({
    options: GUILD_TYPES
  }),
  computed: {
    type: {
      get () {
        return this.$store.state.account.guild.type
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { type: value })
      }
    }
  }
}
</script>
