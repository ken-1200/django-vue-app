import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  user_access_token: null,
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

  it('Mutations updateUserAccessToken Test', () => {
    const UseraccessToken = "106cb4a36153827195af46d47c9b841e3"
    expect(store.state.user_access_token).toBe(null);
    store.commit('updateUserAccessToken', UseraccessToken);
    expect(store.state.user_access_token).toBe("106cb4a36153827195af46d47c9b841e3")
  });
});
