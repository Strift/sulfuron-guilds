import guildConverter from '~/data/converters/guildConverter.js'

export const state = () => ({
  guilds: []
})

export const mutations = {
  setGuilds (state, guilds) {
    state.guilds = guilds
  }
}

export const getters = {
  allGuilds (state) {
    return state.guilds
  },
  draftGuilds (state) {
    return state.guilds.filter(guild => guild.published === false)
  },
  publishedGuilds (state) {
    return state.guilds.filter(guild => guild.published && !guild.deleted)
  },
  deletedGuilds (state) {
    return state.guilds.filter(guild => guild.deleted)
  }
}

export const actions = {
  async fetchGuilds ({ commit }) {
    const guildsQuerySnapshot = await this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .get()

    const guilds = await Promise.all(guildsQuerySnapshot.docs.map(async (doc) => {
      const redirectsQuerySnapshot = await doc.ref.collection('redirects').get()
      return {
        ...doc.data(),
        redirects: redirectsQuerySnapshot.docs.map(doc => doc.data())
      }
    }))
    commit('setGuilds', guilds)
  },
  async softDeleteGuildById (guildId) {
    await this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .doc(guildId)
      .update({
        ownerUid: null,
        deleted: true
      })
  },
  async hardDeleteGuildById (guildId) {
    await this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .doc(guildId)
      .delete()
  }
}
