import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  //this does not set it to true in Dev
  //strict: process.env.NODE_ENV !== 'production',
  strict: true,

  state: {
    categories: [],
    dogPlaces: [],
    markedCheckboxIds: [],
    mobileFilterIsOpen: false,
    mobileMapIsFullSreen: false,
    searchHereBtnIsVisible: false,
    mapIsIdle: true,
    selectedMarkerIndex: 0,
    mapBounds: null,
  },

  getters: {
    categories: state => state.categories,
    allDogPlaces: state => state.dogPlaces,
    allDogPlaceCoordinates: state => {
      let allDogPlaceCoordinates = []
      for (const [, value] of Object.entries(state.dogPlaces)) {
        allDogPlaceCoordinates.push({
          id: value.id,
          position: {
            lat: value.acf.dogplace_map.lat,
            lng: value.acf.dogplace_map.lng,
          },
        })
      }
      return allDogPlaceCoordinates
    },

    someCheckboxesMarked: state => {
      return state.markedCheckboxIds && state.markedCheckboxIds.length
    },

    dogPlaceCards: (state) => {
      let dogPlaceCards = []
      for (const [, dogPlace] of Object.entries(state.dogPlaces)) {
        if (dogPlace.hasOwnProperty('wdog_meta')) {
          dogPlaceCards.push({
            id: dogPlace.id,
            imgURL: dogPlace.wdog_meta['img_url'],
            alt: dogPlace.wdog_meta['img_alt'],
            title: dogPlace.wdog_meta['wdog_title'],
            category: dogPlace.wdog_meta['wdog_term'],
            link: dogPlace.wdog_meta['wdog_link'],
          })
        }
      }
      return dogPlaceCards
    },
  },

  mutations: {

    setBounds(state, bounds) {
      state.mapBounds = bounds
    },

    mapIsIdle(state, mapIsIdleState) {
      state.mapIsIdle = mapIsIdleState
    },

    hideSearchHereBtn(state) {
      state.searchHereBtnIsVisible = false
    },

    showSearchHereBtn(state) {
      if (state.mapIsIdle) {
        state.searchHereBtnIsVisible = true
      }
    },

    selectMarker(state, selectedMarkerIndex) {
      //console.log('mutation selects marker', selectedMarkerIndex)
      state.selectedMarkerIndex = selectedMarkerIndex
    },

    enterFullScreenMap(state) {
      state.mobileMapIsFullSreen = true
    },

    exitFullScreenMap(state) {
      state.mobileMapIsFullSreen = false
    },

    toggleMobileFilter(state) {
      state.mobileFilterIsOpen = !state.mobileFilterIsOpen
    },

    addToChecked(state, checkboxId) {
      state.markedCheckboxIds.push(checkboxId)
    },

    removeFromChecked(state, checkboxId) {
      //console.log('store uncheck ' + checkboxId)
      const index = state.markedCheckboxIds.indexOf(checkboxId);
      if (index !== -1) {
        state.markedCheckboxIds.splice(index, 1);
      }
    },

    clearAllCheckboxes(state) {
      state.markedCheckboxIds = []
    },

    clearCheckboxesByCardId(state, checkboxCardId) {

      console.log('mutation checkboxCardId - ')
      console.log(checkboxCardId)

      let cardCheckboxIds = state.categories
        .filter(el => el.id === checkboxCardId)
        .map(el => el.children.map(el => el.id))
        .flat();

      state.markedCheckboxIds = state.markedCheckboxIds
        .filter(el => !cardCheckboxIds.includes(el));
    },

    setCategories(state, categories) {
      state.categories = categories
    },

    setDogPlaces(state, dogPlaces) {
      state.dogPlaces = dogPlaces
    },
    toggleCard(state, clickedItemId) {
      state.categories = state.categories.map(el => {
        if (el.id === clickedItemId) {
          return {
            ...el,
            isOpen: !el.isOpen,
          };
        }
        return {
          ...el,
          isOpen: false,
        }
      })
    },
    closeCards(state) {
      state.categories = state.categories.map(el => {
        return {
          ...el,
          isOpen: false,
        }
      })
    }, //closeCards mutation end
  }, //mutations end

  actions: {

    searchDogPlacesWithinBounds({ commit, dispatch }) {
      commit('hideSearchHereBtn')
      dispatch('getDogPlaces')
    },

    hideSearchHereBtn({ commit }) {
      commit('hideSearchHereBtn')
    },

    showSearchHereBtn({ state, commit }) {
      if (state.mobileMapIsFullSreen) {
        //console.log('display search here button when fullsreen')
        commit('showSearchHereBtn')
      }
    },

    selectMarker({ commit }, { index }) {
      //TODO - remove index or id
      commit('enterFullScreenMap')
      commit('selectMarker', index)
      //console.log('store got index', index)
      //console.log('store got id', id)
    },

    clearAllCheckboxesAction({ commit }) {
      commit('clearAllCheckboxes')
    },

    clearCheckboxByCardIdAction({ commit }, checkboxCardId) {
      console.log('action checkboxCardId - ')
      console.log(checkboxCardId)
      commit('clearCheckboxesByCardId', checkboxCardId)
    },

    updateCategoryCheckboxAction({ commit }, checkbox) {
      commit('toggleCheckbox', checkbox)
    },

    toggleCard({ commit }, id) {
      commit('toggleCard', id)
    },

    closeCards({ commit }) {
      commit('closeCards')
    },
    //TODO: abstract out axios API
    getCategories({ commit }) {
      Api().get('/wp/v2/dogplace-type?per_page=100')
        .then(response => {
          const categoriesFlat = response.data
          const categoriesSorted = categoriesFlat.sort(
            (i, j) => i.parent - j.parent
          )
          let categoriesParentChild = []
          categoriesSorted.reduce((acc, category) => {
            let ctg = {
              id: category.id,
              name: category.name,
              children: [],
            }
            if (category.parent) {
              acc[category.parent].children.push(ctg)
            } else {
              categoriesParentChild.push(ctg)
              ctg['isOpen'] = false
            }
            acc[category.id] = ctg
            return acc
          }, [])
          commit('setCategories', categoriesParentChild)
        })
    },
    getDogPlaces({ state, commit }) {
      /*
      17 - grooming, 22 - shopping
      instance.get('wp-json/wp/v2/dogplace?per_page=100&dogplace-type=17,22')
      switched from '/wp/v2/dogplace' to custom route '/wdog/v1/dogplaces'
      */

      const ids = state.markedCheckboxIds.toString()
      const sw = encodeURIComponent(state.mapBounds.getSouthWest().toUrlValue())
      const ne = encodeURIComponent(state.mapBounds.getNorthEast().toUrlValue())
      Api().get('/wdog/v1/dogplaces', {
        params: {
          'dogplace-type': ids,
          'sw': sw,
          'ne': ne,
        },
      })
        .then(response => {
          commit('setDogPlaces', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
  },

  modules: {

  },

})

export default store
