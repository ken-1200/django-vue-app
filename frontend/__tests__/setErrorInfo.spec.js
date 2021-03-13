import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  errorInfo: null,
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

  it('Mutations setErrorInfo Test', () => {
    const errorInfo = "403 forbidden"
    expect(store.state.errorInfo).toBe(null);
    store.commit('setErrorInfo', errorInfo);
    expect(store.state.errorInfo).toBe("403 forbidden")
  });
});
