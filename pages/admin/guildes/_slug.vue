<template>
  <div class="space-y-8">
    <Heading2 class="flex items-baseline justify-between">
      Changer le GM <span v-if="guild" class="text-base text-gray-600">{{ guild.name }}</span>
    </Heading2>
    <UiLoader v-if="fetchState.pending" class="mx-auto" />
    <div v-else class="space-y-8">
      <InformationCard>
        <p v-if="guild.ownerUid">
          Le GM actuel est <span class="font-semibold">{{ guild.ownerUid }}</span>.
        </p>
        <p v-else>
          ⚠ Aucun GM renseigné pour la guilde <span class="font-semibold">{{ guild.name }}</span>.
        </p>
        <p>
          Vous pouvez choisir un nouveau GM pour <span class="font-semibold">{{ guild.name }}</span>.
        </p>
      </InformationCard>
      <AdminUserInput v-model="newOwnerUid" />
      <BasePrimaryButton @click="onSave">
        Valider
      </BasePrimaryButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import Heading2 from '~/components/atoms/Heading2.vue'
import InformationCard from '~/components/atoms/InformationCard.vue'
import BasePrimaryButton from '~/components/Base/PrimaryButton.vue'
import AdminUserInput from '~/components/Admin/UserInput.vue'
import useGuilds from '~/composables/database/useGuilds'

export default defineComponent({
  layout: 'admin',
  components: {
    Heading2,
    InformationCard,
    BasePrimaryButton,
    AdminUserInput
  },
  setup () {
    const guild = ref(null)
    const newOwnerUid = ref(null)

    const route = useRoute()
    const { findBySlug, updateBySlug } = useGuilds()

    const { fetch, fetchState } = useFetch(async () => {
      guild.value = await findBySlug(route.value.params.slug)
    })

    const onSave = async (ownerUid) => {
      await updateBySlug(route.value.params.slug, { ownerUid: newOwnerUid.value })
      newOwnerUid.value = null
      fetch()
    }

    return {
      guild,
      newOwnerUid,
      fetchState,
      onSave
    }
  }
})
</script>
