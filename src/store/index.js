import Vuex from "vuex"
import Vue from "vue"

import * as actionsG from './action'
import  state from './state'
import  mutations from './mutations'
import  getters from './getters'

Vue.use(Vuex);

const actions = Object.assign(actionsG);
const Store = new Vuex.Store({
  actions,
  state,
  mutations,
  getters,
  strict: false
})

export default Store
