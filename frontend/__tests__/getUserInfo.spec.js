import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  userInfo: [],
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

  it('Mutations getUserInfo Test', () => {
    const userInfo = {
      user_name: "testName",
      user_email: "test@test.com",
    }
    expect(store.state.userInfo).toStrictEqual([]);
    store.commit('getUserInfo', userInfo);
    expect(store.state.userInfo).toStrictEqual({
      user_name: "testName",
      user_email: "test@test.com",
    })
  });
});
