import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  itemInfo: [
    {
      alert:false,
      itemQuantity:19,
      item_id:"2",
      item_name:"ローカルテスト2",
      item_price:2000,
      item_total:1,
    }
  ]
}

const initStore = () => {
  return {
    state,
    mutations,
  }
}

describe('store', () => {
  let store
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store(
      initStore()
    )
  });

  it('Mutations deleteCartInfo Test', () => {
    const id = 2;
    expect(store.state.itemInfo).toStrictEqual([
      {
        alert:false,
        itemQuantity:19,
        item_id:"2",
        item_name:"ローカルテスト2",
        item_price:2000,
        item_total:1,
      }
    ]);
    store.commit('deleteCartInfo', id);
    expect(store.state.itemInfo).toStrictEqual([])
  });
});
