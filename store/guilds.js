import Fuse from 'fuse.js'
import { firestoreAction } from 'vuexfire'

import guildConverter from '~/converters/guildConverter.js'

const FUSE_OPTIONS = {
  threshold: 0.2,
  keys: ['name', 'type']
}

const getSpecId = (classValue, specValue) => `${classValue}/${specValue}`

export const state = () => ({
  list: [],
  classFilters: [],
  textQuery: '',
  fuse: null
})

export const mutations = {
  setClassFilters (state, classFilters) {
    state.classFilters = classFilters
  },
  setTextQuery (state, textQuery) {
    state.textQuery = textQuery
  },
  removeClassFilter (state, { classValue, specValue }) {
    const classIndex = state.classFilters.findIndex(classFilter => classFilter.class === classValue)
    const specIndex = state.classFilters[classIndex].specs.findIndex(({ value }) => value === specValue)

    state.classFilters[classIndex].specs[specIndex].checked = false
  }
}

export const actions = {
  enableSync: firestoreAction(function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      // .where('published', '==', true)

    return bindFirestoreRef('list', ref, { wait: true })
  }),
  disableSync: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('list', false)
  })
}

export const getters = {
  currentFactionGuilds (state, getters, rootState) {
    return state.list.filter(guild => guild.published && guild.faction === rootState.faction)
  },
  draftGuilds (state) {
    return state.list.filter(guild => guild.published === false)
  },
  publishedGuilds (state) {
    return state.list.filter(guild => guild.published)
  },
  searchedSpecsIds (state) {
    // Map/flatten array of class.specs[] to specIds[]
    return state.classFilters
      .map((classFilter) => {
        return classFilter.specs
          .filter(({ checked }) => checked)
          .map(spec => getSpecId(classFilter.class, spec.value))
      })
      .flat()
  },
  fuzzySearchResults (state) {
    if (state.textQuery.length === 0) {
      return state.list
    }

    // Create Fuse if it does not exist
    if (state.fuse === null) {
      state.fuse = new Fuse(state.list, FUSE_OPTIONS)
    } else {
      state.fuse.setCollection(state.list)
    }

    return state.fuse.search(state.textQuery).map(result => result.item)
  },
  searchResults (state, getters, rootState) {
    const guilds = getters.fuzzySearchResults
    const searchedSpecsIds = getters.searchedSpecsIds

    // Filter the list to only have guilds that match searched specs
    return guilds
      .filter((guild) => {
        // Filter guilds if they don't match current faction
        if (guild.faction !== rootState.faction) {
          return false
        }

        // Filter guilds if they don't have contact URL
        if (guild.contactUrl.length === 0) {
          return false
        }

        // Map/flatten array of class.specs[] to specIds[]
        const guildOpenSpecs = guild.recruitment
          .map((classRecruitment) => {
            return classRecruitment.specs
              .filter(({ open }) => open)
              .map(spec => getSpecId(classRecruitment.class, spec.value))
          })
          .flat()
        // Filter guilds if all searched specs are present in guild open specs
        return searchedSpecsIds.every(id => guildOpenSpecs.includes(id))
      })
  },
  classFilters (state) {
    return state.classFilters
      .map((classFilter) => {
        return classFilter.specs
          .filter(({ checked }) => checked)
          .map(spec => ({
            classValue: classFilter.class,
            specValue: spec.value,
            specName: spec.name
          }))
      })
      .flat()
  }
}
