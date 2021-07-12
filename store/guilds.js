import Fuse from 'fuse.js'
import { firestoreAction } from 'vuexfire'

import guildConverter from '~/converters/guildConverter.js'

const FUSE_OPTIONS = {
  threshold: 0.2,
  keys: ['name', 'type']
}

const getSpecId = (classValue, specValue) => `${classValue}/${specValue}`

let fuse = null

export const state = () => ({
  list: [],
  classFilters: [],
  textQuery: ''
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
      .where('published', '==', true)

    return bindFirestoreRef('list', ref, { wait: true })
  }),
  disableSync: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('list', false)
  })
}

export const getters = {
  /*
  ** Array of specializations IDs
  ** Used internally by `searchResults` getter
  */
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
  /*
  ** Result of the fuzzy-search
  ** Used internally by `searchResults` getter
  */
  fuzzySearchResults (state) {
    if (state.textQuery.length === 0) {
      return state.list
    }

    // Create Fuse if it does not exist
    if (fuse === null) {
      fuse = new Fuse(state.list, FUSE_OPTIONS)
    } else {
      fuse.setCollection(state.list)
    }

    return fuse.search(state.textQuery).map(result => result.item)
  },
  /*
  ** Final search results displayed by the UI
  */
  searchResults (state, getters, rootState) {
    const guilds = getters.fuzzySearchResults
    const searchedSpecsIds = getters.searchedSpecsIds

    // Filter the list to only have guilds that match searched specs
    return guilds
      .filter((guild) => {
        // Filter out deleted guilds
        if (guild.deleted) { return false }
        // Filter out guilds that don't match the current faction
        if (guild.faction !== rootState.faction) { return false }
        // Filter out guilds that don't have a contact URL
        if (guild.contactUrl.length === 0) { return false }

        // Map-flatten array of class.specs[] to specIds[]
        const guildOpenSpecs = guild.recruitment
          .map((classRecruitment) => {
            return classRecruitment.specs
              .filter(({ open }) => open)
              .map(spec => getSpecId(classRecruitment.class, spec.value))
          })
          .flat()
        // Keep only guilds for which open specs includes all searched specs
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
