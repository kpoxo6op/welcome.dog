import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    categories: [],
    dogPlaces: [],
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
    setCategories(state, categories) {
      state.categories = categories
    },
    setDogPlaces(state, dogPlaces) {
      state.dogPlaces = dogPlaces
    },
    openCard(state, clickedItemId) {
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
    }, //openCard mutation end
  }, //mutations end

  actions: {
    openCard({ commit }, id) {
      commit('openCard', id)
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
    getAllDogPlacesSync({ commit }) {
      const instance = axios.create({
        baseURL: sageData.ajaxBaseURL, // eslint-disable-line
      })

      instance.get('wp-json/wp/v2/dogplace?per_page=100')
        .then(response => {
          commit('setDogPlaces', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },

    openCardAction({ commit }, id) {
      commit('openCard', id)
    },
  },

  modules: {

  },

})

export default store
