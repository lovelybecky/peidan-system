import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
     auth:null,
     date:null
  },
  mutations: {
     storeAuth:(state,payload)=>{
       state.auth = payload
     },
     storeDate:(state,payload)=>{
      state.date = payload
    }
  }
})