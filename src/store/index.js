import Vuex from "vuex"
import Vue from "vue"

import * as actionsG from './action'

Vue.use(Vuex);

const actions = Object.assign(actionsG);
const Store = new Vuex.Store({
  actions,
})

export default Store
