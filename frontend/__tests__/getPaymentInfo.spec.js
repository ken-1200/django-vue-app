import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'

const state = {
  paymentInfo: [],
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

  it('Mutations getPaymentInfo Test', () => {
    const paymentInfo = [
      {
        fields: {
          bought_at: "2021-03-10T17:00:51.864Z",
          pay_totalprice: 1000,
          user_email: "guest-admin@guest.com",
        },
        model: "payment.payment",
        pk: 1,
      },
      {
        fields: Object,
        model: "payment.payment",
        pk: 2,
      },
    ]
    expect(store.state.paymentInfo).toStrictEqual([]);
    store.commit('getPaymentInfo', paymentInfo);
    expect(store.state.paymentInfo).toStrictEqual([
      {
        fields: {
          bought_at: "2021-03-10T17:00:51.864Z",
          pay_totalprice: 1000,
          user_email: "guest-admin@guest.com",
        },
        model: "payment.payment",
        pk: 1,
      },
      {
        fields: Object,
        model: "payment.payment",
        pk: 2,
      },
    ])
  });
});
