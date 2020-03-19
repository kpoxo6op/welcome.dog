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
    checkedCategoryIds: state => state.categories
      //dive into children
      .map(topc =>
        topc.children
          //find checked checkboxes
          .filter(el => el.isChecked === true)
          //select Ids
          .map(el => el.id)
      )
      .flat()
      .toString(),
  },

  mutations: {
    updateCategoryCheckboxes(state, checkboxes) {
      state.checkboxes = checkboxes
      state.categories = state.categories.map(obj => checkboxes.find(o => o.id === obj.id) || obj);
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
    updateCheckboxes({ commit, getters, dispatch }, checkboxes) {
      commit('updateCategoryCheckboxes', checkboxes)
      let ids = getters.checkedCategoryIds
      dispatch('getDogPlaces', ids)
    },
    toggleCard({ commit }, id) {
      commit('toggleCard', id)
    },
    closeCards({ commit }) {
      commit('closeCards')
    },
    //TODO: abstract out axios API
    getCategories({ commit }) {
      Api().get('/dogplace-type?per_page=100')
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
      /*
      17 - grooming, 22 - shopping
      instance.get('wp-json/wp/v2/dogplace?per_page=100&dogplace-type=17,22')
      */
      console.log('add these IDs to URL as parameters - ')
      console.log(ids)
      Api().get('/dogplace', {
        params: {
          'per_page': '100',
          'dogplace-type': ids,
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
