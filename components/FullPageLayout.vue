<template>
  <div class="flex flex-col min-h-screen">
    <div
      :class="{
        'bg-grayscale-50': showSunwellBg,
        'bg-grayscale-100': showFactionBg,
        'alliance': showFactionBg && isAlliance,
        'horde': showFactionBg && isHorde,
        'sunwell': showSunwellBg
      }"
      class="background flex flex-1 flex-col relative"
    >
      <div
        :class="{
          'bg-opacity-90': showFactionBg,
          'bg-opacity-75': showSunwellBg,
          'overflow-hidden': openGuild,
          'overflow-y-scroll': !openGuild
        }"
        class="bg-gray-900 flex flex-1 flex-col max-h-screen relative"
      >
        <Navbar class="mb-6 md:mb-16" />
        <BaseContainer class="flex-1">
          <slot name="default" />
        </BaseContainer>
        <div class="flex-none h-12 lg:h-24 lg:mt-12 mt-6" style="background-image: linear-gradient(180deg, rgba(26,32,44,0), rgb(26,32,44))" />
        <Footer />
      </div>
    </div>
    <GuildModal
      v-if="openGuild"
      :id="openGuild.id"
      :name="openGuild.name"
      :type="openGuild.type"
      :description="openGuild.description"
      :raid-days="openGuild.raidDays"
      :start-hour="openGuild.startHour"
      :end-hour="openGuild.endHour"
      :recruitment="openGuild.recruitment"
      :logo-url="openGuild.logoUrl"
      :website-url="openGuild.websiteUrl"
      :contact-url="openGuild.contactUrl"
    />
    <NotificationList class="bottom-0 fixed w-full" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import GuildModal from '~/components/GuildModal.vue'
import NotificationList from '~/components/NotificationList.vue'

const DEFAULT_FACTION_COOKIE = 'default_faction'

export default {
  components: {
    Navbar,
    Footer,
    GuildModal,
    NotificationList
  },
  props: {
    background: {
      type: String,
      default: 'faction'
    }
  },
  computed: {
    ...mapState([
      'faction',
      'openGuild'
    ]),
    ...mapGetters([
      'isAlliance',
      'isHorde'
    ]),
    showFactionBg () {
      return this.background === 'faction'
    },
    showSunwellBg () {
      return this.background === 'sunwell'
    },
    openGuildTimeRange () {
      return this.openGuild.startHour + ' – ' + this.openGuild.endHour
    },
    openGuildRaidDays () {
      return this.openGuild.raidDays
        .filter(({ playing }) => playing)
        .map(({ day }) => day)
    }
  },
  watch: {
    faction (newFaction) {
      this.$cookies.set(DEFAULT_FACTION_COOKIE, newFaction)
    }
  },
  mounted () {
    const faction = this.$cookies.get(DEFAULT_FACTION_COOKIE)
    if (faction === null) {
      this.$cookies.set(DEFAULT_FACTION_COOKIE, this.faction)
    } else {
      this.$store.commit('setFaction', faction)
    }
  }
}
</script>

<style scoped>

.background::before {
  content: "";
  @apply absolute inset-0 bg-bottom transition-background duration-1000 ease-in-out;
}

.bg-grayscale-50::before {
  filter: grayscale(70%);
  mix-blend-mode: screen;
}

.bg-grayscale-100::before {
  filter: grayscale(100%);
  mix-blend-mode: screen;
}

.sunwell::before {
  background-image: url('~assets/images/sunwell-background.jpg');
  @apply bg-cover;
}

.alliance::before {
  background-image: url('~assets/images/alliance-background.jpg');
  @apply bg-cover;
}

.horde::before {
  background-image: url('~assets/images/horde-background.jpg');
  @apply bg-cover;
}
</style>
