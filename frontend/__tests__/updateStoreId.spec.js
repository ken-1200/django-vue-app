import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  store_id: null,
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

  it('Mutations updateAccessToken Test', () => {
    const storeId = "1"
    expect(store.state.store_id).toBe(null);
    store.commit('updateStoreId', storeId);
    expect(store.state.store_id).toBe("1")
  });
});
