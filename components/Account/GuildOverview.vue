<template>
  <div class="flex">
    <div class="flex space-x-8">
      <AccountStatistic label="Visites" :value="websiteRedirects" />
      <AccountStatistic label="Contacts" :value="contactRedirects" />
    </div>
    <!-- <AccountRefresh :up-to-date="true" class="ml-auto" /> -->
  </div>
</template>

<script>
export default {
  props: {
    websiteRedirects: {
      type: Number,
      required: true
    },
    contactRedirects: {
      type: Number,
      required: true
    }
  }
}
</script>
