import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import actionsStore from './actionsStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { //初期値
    access_token: null,
    user_access_token: null,
    store_id: null,
    user_id: null,
    userInfo: [],
    storeItemData: [],
    allItemListData: [],
    addToCart: [],
    itemInfo: [],
    paymentInfo: [],
    errorInfo: null,
  },
  getters,
  mutations,
  actions,
  modules: {
    actionsStore,
  }
});