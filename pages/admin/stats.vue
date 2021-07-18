<template>
  <div class="space-y-8">
    <PageSectionTitle>Stats</PageSectionTitle>
    <div v-if="publishedGuilds && publishedGuilds.length">
      <table>
        <tr>
          <th>Spec ID</th>
          <th>% Open</th>
        </tr>
        <tr>
          <td colspan="2">
            Alliance
          </td>
        </tr>
        <tr
          v-for="specId in Object.keys(allianceStats)"
          :key="specId"
        >
          <td>{{ specId }}</td>
          <td>{{ allianceStats[specId].open / allianceStats[specId].total * 100 }}</td>
        </tr>
        <tr>
          <td colspan="2">
            Horde
          </td>
        </tr>
        <tr
          v-for="specId in Object.keys(hordeStats)"
          :key="specId"
        >
          <td>{{ specId }}</td>
          <td>{{ hordeStats[specId].open / hordeStats[specId].total * 100 }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'
import PageSectionTitle from '~/components/ui/PageSectionTitle.vue'
import getSpecId from '~/data/utils/getSpecId'

export default defineComponent({
  layout: 'admin',
  components: {
    PageSectionTitle
  },
  computed: {
    ...mapGetters('admin', [
      'publishedGuilds',
      'deletedGuilds'
    ]),
    allianceStats () {
      return this.stats('Alliance')
    },
    hordeStats () {
      return this.stats('Horde')
    }
  },
  methods: {
    stats (currentFaction) {
      return this.guildsSpecsRecruitment(currentFaction)
        .reduce((stats, spec) => {
          if (!stats[spec.id]) {
            stats[spec.id] = {
              open: 0,
              closed: 0,
              total: 0
            }
          }

          stats[spec.id].total += 1
          if (spec.open) {
            stats[spec.id].open += 1
          } else {
            stats[spec.id].closed += 1
          }

          return stats
        }, {})
    },
    guildsSpecsRecruitment (currentFaction) {
      return this.publishedGuilds
        .filter(({ faction }) => faction === currentFaction)
        .map(({ recruitment }) => {
          return recruitment.map(recruitmentStatus => recruitmentStatus.specs
            .map(({ open, value: specValue }) => {
              return {
                id: getSpecId(recruitmentStatus.class, specValue),
                open
              }
            }))
            .flat()
        })
        .flat()
    }
  },
  head () {
    return {
      title: 'Statistiques'
    }
  }
})
</script>
