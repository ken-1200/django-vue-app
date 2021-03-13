import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  user_id: null,
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

  it('Mutations updateUserId Test', () => {
    const userId = "1"
    expect(store.state.user_id).toBe(null);
    store.commit('updateUserId', userId);
    expect(store.state.user_id).toBe("1")
  });
});
