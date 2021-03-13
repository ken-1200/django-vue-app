import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  access_token: null,
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
    const accessToken = "106cb4a36153827195af46d47c9b841e3"
    expect(store.state.access_token).toBe(null);
    store.commit('updateAccessToken', accessToken);
    expect(store.state.access_token).toBe("106cb4a36153827195af46d47c9b841e3")
  });
});
