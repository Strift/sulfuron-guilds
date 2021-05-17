import { firestoreAction } from 'vuexfire'
import guildConverter from '~/converters/guildConverter.js'

export const state = () => ({
  guilds: []
})

export const mutations = {}

export const getters = {
  draftGuilds (state) {
    return state.guilds.filter(guild => guild.published === false)
  },
  publishedGuilds (state) {
    return state.guilds.filter(guild => guild.published)
  }
}

export const actions = {
  enableGuildsSync: firestoreAction(function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)

    return bindFirestoreRef('guilds', ref, { wait: true })
  }),
  disableGuildsSync: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('guilds', false)
  }),
  async removeGuildById (ctx, guildId) {
    const guildRef = this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .doc(guildId)

    await guildRef.update({ deleted: true })
  },
  async restoreGuildById (ctx, guildId) {
    const guildRef = this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .doc(guildId)

    await guildRef.update({ deleted: false })
  }
}
