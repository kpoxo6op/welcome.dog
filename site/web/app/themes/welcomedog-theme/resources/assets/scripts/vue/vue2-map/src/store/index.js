import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    categories: [],
    dogPlaces: [],
  },

  getters: {
    //read ALL categories from state
    allCategories: state => state.categories,
    //read parent categories from state

    topLvlCategoryNames: state => state.categories
      .filter(category => category.parent == 0)
      .map(category => category.name),

    allDogPlaces: state => state.dogPlaces,

    allDogPlaceCoordinates: state => {
      let allDogPlaceCoordinates = [];
      for (const [, value] of Object.entries(state.dogPlaces)) {
        allDogPlaceCoordinates.push({
          id: value.id,
          position: {
            lat: value.acf.dogplace_map.lat,
            lng: value.acf.dogplace_map.lng,
          },
        });
      }
      return allDogPlaceCoordinates
    },



    /*
doneTodos: state => {
  return state.todos.filter(todo => todo.done)
}
*/

  },

  mutations: {
    //modify state
    //put dogplace categories and dogplaces in our state
    setCategories(state, categories) {
      state.categories = categories
    },
    setDogPlaces(state, dogPlaces) {
      state.dogPlaces = dogPlaces
    },
  },

  actions: {
    //get categories and dogplaces from Wordpress
    getAllCategoriesSync({ commit }) {
      console.log('WP_HOME value from .env at /site level - ')
      console.log(process.env.WP_HOME)
      //console.log('WP_SITEURL value from .env at /site level - ')
      //console.log(process.env.WP_SITEURL)

      axios.get(process.env.WP_HOME + '/wp-json/wp/v2/dogplace-type?per_page=100')
        .then(response => {
          commit('setCategories', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getAllDogPlacesSync({ commit }) {
      axios.get(process.env.WP_HOME + '/wp-json/wp/v2/dogplace?per_page=100')
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

});

export default store
