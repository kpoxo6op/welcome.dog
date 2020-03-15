import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    categories: [],
    dogPlaces: [],
    filters: [],
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
  },

  mutations: {
    setFilters(state, filters) {
      state.filters = filters
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
    }, //toggleCard mutation end
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
    setFilters({ commit }, checkboxes) {
      console.log('update filters')
      console.log('do I need to create another store object? Update in categories?')
      commit('setFilters', checkboxes)
    },
    toggleCard({ commit }, id) {
      commit('toggleCard', id)
    },
    closeCards({ commit }) {
      commit('closeCards')
    },
    //TODO: abstract out axios API
    getCategories({ commit }) {
      const instance = axios.create({
        baseURL: sageData.ajaxBaseURL, // eslint-disable-line 
      })

      instance.get('wp-json/wp/v2/dogplace-type?per_page=100')
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
              ctg['isChecked'] = false
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
    getDogPlaces({ commit }, ids) {
      const instance = axios.create({
        baseURL: sageData.ajaxBaseURL, // eslint-disable-line
      })
      /*
      17 - grooming, 22 - shopping
      instance.get('wp-json/wp/v2/dogplace?per_page=100&dogplace-type=17,22')
      */
      console.log('add these IDs to URL as parameters - ')
      console.log(ids)
      instance.get('wp-json/wp/v2/dogplace?per_page=100&dogplace-type=')
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
