import Fuse from 'fuse.js'
import { DateTime } from 'luxon'
import sortBy from 'lodash/sortBy'
import { firestoreAction } from 'vuexfire'

import guildConverter from '~/data/converters/guildConverter.js'
import findClassIndex from '~/data/utils/findClassIndex'
import findSpecIndex from '~/data/utils/findSpecIndex'
import getSpecId from '~/data/utils/getSpecId'

import WOW_CLASSES from '~/data/classes.json'

const FUSE_OPTIONS = {
  threshold: 0.2,
  keys: ['name', 'type']
}

let fuse = null

export const state = () => ({
  list: [],
  classFilters: []
})

export const mutations = {
  setClassFilters (state, classFilters) {
    state.classFilters = classFilters
  },
  setAllClassFilters (state, enabled) {
    state.classFilters.forEach((wowClass) => {
      wowClass.specs.forEach((spec) => {
        spec.checked = enabled
      })
    })
  },
  initializeClassFilters (state) {
    state.classFilters = sortBy(WOW_CLASSES, 'name')
      .map(wowClass => ({
        name: wowClass.name,
        class: wowClass.value,
        specs: wowClass.specs.map(spec => ({ ...spec, checked: false }))
      }))
  },
  setClassFilter (state, { classValue, specValue, enabled }) {
    const classIndex = findClassIndex(state.classFilters, classValue)
    const specIndex = findSpecIndex(state.classFilters[classIndex].specs, specValue)
    state.classFilters[classIndex].specs[specIndex].checked = enabled
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
  }),
  async findBySlug (ctx, slug) {
    const guildSnapshot = await this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .where('slug', '==', slug)
      .get()

    if (guildSnapshot.empty) {
      return null
    }
    return guildSnapshot.docs[0].data()
  }
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
  fuzzySearchResults (state, _, rootState) {
    if (rootState.search.textQuery.length === 0) {
      return state.list
    }

    // Create Fuse if it does not exist
    if (fuse === null) {
      fuse = new Fuse(state.list, FUSE_OPTIONS)
    } else {
      fuse.setCollection(state.list)
    }

    return fuse.search(rootState.search.textQuery).map(result => result.item)
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
        // Filter out guilds that are not updated
        if (rootState.search.removeOutdatedGuilds &&
          (guild.updatedAt === undefined || DateTime.fromJSDate(guild.updatedAt).diffNow('days').days < -30)
        ) { return false }

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
            className: classFilter.name,
            classValue: classFilter.class,
            specName: spec.name,
            specValue: spec.value
          }))
      })
      .flat()
  }
}
