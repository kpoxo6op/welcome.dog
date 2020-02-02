import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    categories: [],
  },

  getters: {
    //read from state
    //read ALL categories from state
    allCategories: state => state.categories,
    //read parent categories from state
    topLvlCategoryNames: state => state.categories
      .filter(category => category.parent == 0)
      .map(category => category.name),



    /*
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
  */

  },

  mutations: {
    //modify state
    //put dogplace categories in our state
    setCategories(state, categories) {
      state.categories = categories
    },
  },

  actions: {
    //get dogplace categories from Wordpress
    getAllCategories({ commit }) {
      axios.get('http://welcomedog.test/wp-json/wp/v2/dogplace-type?per_page=100')
        .then(response => {
          commit('setCategories', response.data)
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
