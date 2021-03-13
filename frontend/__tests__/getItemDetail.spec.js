import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  storeItemData: [],
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

  it('Mutations getItemDetail Test', () => {
    const storeItemData = [
      {
        fields: Object,
        model: "item.item",
        pk: 1
      },
      {
        fields: Object,
        model: "item.item",
        pk: 2
      },
    ]
    expect(store.state.storeItemData).toStrictEqual([]);
    store.commit('getItemDetail', storeItemData);
    expect(store.state.storeItemData).toStrictEqual([
      {
        fields: Object,
        model: "item.item",
        pk: 1
      },
      {
        fields: Object,
        model: "item.item",
        pk: 2
      },
    ]);
  });
});
