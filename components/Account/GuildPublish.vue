<template>
  <div
    class="flex items-baseline justify-between"
  >
    <BaseInformationCard>
      N'oubliez pas de cliquer sur publier une fois les informations de votre guilde renseignées.
    </BaseInformationCard>
    <BasePrimaryButton @click="$emit('publish')">
      Publier
    </BasePrimaryButton>
  </div>
</template>
