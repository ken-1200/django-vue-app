import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  allItemListData: [],
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

  it('Mutations getAllItemListData Test', () => {
    const allItemListData = [
      {
        fields: {
          created_at: "2021-03-10T16:58:56.249Z",
          deleted_at: null,
          item_detail: "ローカルのテスト商品です。",
          item_img: "/media/image/ローカルテスト.jpg",
          item_name: "ローカルテスト",
          item_price: 1000,
          item_total: 18,
          store_owner: 1,
          updated_at: "2021-03-11T00:45:48.440Z",
        },
        model: "item.item",
        pk: 1
      },
      {
        fields: Object,
        model: "item.item",
        pk: 2
      },
    ]
    expect(store.state.allItemListData).toStrictEqual([]);
    store.commit('getAllItemListData', allItemListData);
    expect(store.state.allItemListData).toStrictEqual([
      {
        fields: {
          created_at: "2021-03-10T16:58:56.249Z",
          deleted_at: null,
          item_detail: "ローカルのテスト商品です。",
          item_img: "/media/image/ローカルテスト.jpg",
          item_name: "ローカルテスト",
          item_price: 1000,
          item_total: 18,
          store_owner: 1,
          updated_at: "2021-03-11T00:45:48.440Z",
        },
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
