<template>
  <BaseSelect
    v-model="userUid"
    :options="usersOptions"
    label="Compte Battle.net du GM"
    :placeholder="usersPlaceholder"
    name="bnet-account"
  />
</template>

<script>
import { computed, toRefs } from '@vue/composition-api'
import useUsers, {
  STATE_EMPTY as USERS_STATE_EMPTY,
  STATE_LOADED as USERS_STATE_LOADED,
  STATE_LOADING as USERS_STATE_LOADING
} from '~/composables/admin/useUsers'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const { value } = toRefs(props)
    const userUid = computed({
      get: () => value.value,
      set: val => emit('input', val)
    })
    const { users, state: usersState, fetchUsers } = useUsers()

    const usersOptions = computed(() => users.value.map(userId => ({ label: userId, value: userId })))
    const usersPlaceholder = computed(() => {
      if (usersState.value === USERS_STATE_EMPTY) { return 'Cliquez pour charger...' }
      if (usersState.value === USERS_STATE_LOADING) { return 'Chargement...' }
      if (usersState.value === USERS_STATE_LOADED) { return 'Sélectionnez le compte' }
      return 'Erreur'
    })

    fetchUsers()

    return {
      userUid,
      usersOptions,
      usersPlaceholder
    }
  }
}
</script>
